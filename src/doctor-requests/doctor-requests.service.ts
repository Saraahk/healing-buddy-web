// src/doctor-requests/doctor-requests.service.ts
import { 
  Injectable, 
  NotFoundException, 
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDoctorRequestDto } from './dto/create-doctor-request.dto';
import { UpdateDoctorRequestDto } from './dto/update-doctor-request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorRequestsService {
  constructor(private prisma: PrismaService) {}

  async create(createDoctorRequestDto: CreateDoctorRequestDto) {
    // Check if email already exists
    const existingRequest = await this.prisma.doctorRequest.findUnique({
      where: { email: createDoctorRequestDto.email }
    });

    if (existingRequest) {
      throw new BadRequestException('A request with this email already exists');
    }

    // Check if user with this email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createDoctorRequestDto.email }
    });

    if (existingUser) {
      throw new BadRequestException('A user with this email already exists');
    }

    return this.prisma.doctorRequest.create({
      data: createDoctorRequestDto,
    });
  }

  async findAll() {
    const requests = await this.prisma.doctorRequest.findMany({
      include: {
        reviewer: {
          select: {
            id: true,
            full_name: true,
            email: true,
          }
        },
        doctor: {
          include: {
            user: {
              select: {
                id: true,
                full_name: true,
                email: true,
              }
            }
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    return requests;
  }

  async findOne(id: string) {
    const request = await this.prisma.doctorRequest.findUnique({
      where: { id },
      include: {
        reviewer: {
          select: {
            id: true,
            full_name: true,
            email: true,
          }
        },
        doctor: {
          include: {
            user: {
              select: {
                id: true,
                full_name: true,
                email: true,
              }
            }
          }
        }
      }
    });

    if (!request) {
      throw new NotFoundException(`Doctor request with ID ${id} not found`);
    }

    return request;
  }

  async update(id: string, updateDoctorRequestDto: UpdateDoctorRequestDto) {
    await this.findOne(id);

    // If updating email, check if it's already taken
    if (updateDoctorRequestDto.email) {
      const existingRequest = await this.prisma.doctorRequest.findFirst({
        where: {
          email: updateDoctorRequestDto.email,
          NOT: { id: id }
        }
      });

      if (existingRequest) {
        throw new BadRequestException('A request with this email already exists');
      }
    }

    return this.prisma.doctorRequest.update({
      where: { id },
      data: updateDoctorRequestDto,
      include: {
        reviewer: {
          select: {
            id: true,
            full_name: true,
            email: true,
          }
        }
      }
    });
  }

  async approve(id: string, reviewerId: string, reviewNotes?: string) {
    const request = await this.findOne(id);

    if (request.status !== 'Pending') {
      throw new BadRequestException(`Request is already ${request.status}`);
    }

    // Check if user already exists with this email
    const existingUser = await this.prisma.user.findUnique({
      where: { email: request.email }
    });

    if (existingUser) {
      throw new BadRequestException('A user with this email already exists');
    }

    // Generate a temporary password (you should send this to the user via email)
    const tempPassword = this.generateTemporaryPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Start a transaction to create user, doctor, and update request
    return this.prisma.$transaction(async (prisma) => {
      // 1. Create the user with password_hash
      const user = await prisma.user.create({
        data: {
          email: request.email,
          password_hash: hashedPassword,
          full_name: request.full_name,
          phone: request.phone_number,
          role: 'Doctor',
          account_status: 'Active',
          is_verified: true,
        }
      });

      // 2. Create the doctor
      const doctor = await prisma.doctor.create({
        data: {
          user_id: user.id,
          specialty: request.medical_specialty,
          license_number: request.medical_license_no,
          years_of_experience: request.years_of_experience,
          biography: request.brief_introduction || '',
          is_verified: true,
          verified_at: new Date(),
          verified_by: reviewerId,
          joined_at: new Date(),
        }
      });

      // 3. Update the doctor request
      const updatedRequest = await prisma.doctorRequest.update({
        where: { id },
        data: {
          status: 'Approved',
          reviewed_by: reviewerId,
          review_notes: reviewNotes || null,
          reviewed_at: new Date(),
          doctor_id: doctor.id,
        },
        include: {
          reviewer: {
            select: {
              id: true,
              full_name: true,
              email: true,
            }
          },
          doctor: {
            include: {
              user: {
                select: {
                  id: true,
                  full_name: true,
                  email: true,
                }
              }
            }
          }
        }
      });

      // In production, send the temporary password via email
      console.log(`Temporary password for ${request.email}: ${tempPassword}`);
      
      return updatedRequest;
    });
  }

  async reject(id: string, reviewerId: string, reviewNotes?: string) {
    const request = await this.findOne(id);

    if (request.status !== 'Pending') {
      throw new BadRequestException(`Request is already ${request.status}`);
    }

    return this.prisma.doctorRequest.update({
      where: { id },
      data: {
        status: 'Rejected',
        reviewed_by: reviewerId,
        review_notes: reviewNotes || null,
        reviewed_at: new Date(),
      },
      include: {
        reviewer: {
          select: {
            id: true,
            full_name: true,
            email: true,
          }
        }
      }
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.doctorRequest.delete({
      where: { id },
    });
  }

  // Get requests by status
  async findByStatus(status: string) {
    const validStatuses = ['Pending', 'Approved', 'Rejected'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
    }

    return this.prisma.doctorRequest.findMany({
      where: { status },
      include: {
        reviewer: {
          select: {
            id: true,
            full_name: true,
            email: true,
          }
        },
        doctor: {
          include: {
            user: {
              select: {
                id: true,
                full_name: true,
                email: true,
              }
            }
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });
  }

  // Get pending requests count
  async getPendingCount() {
    return this.prisma.doctorRequest.count({
      where: { status: 'Pending' }
    });
  }

  // Helper method to generate temporary password
  private generateTemporaryPassword(): string {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }
}