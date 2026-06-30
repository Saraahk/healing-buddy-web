import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async adminLogin(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user.role !== 'Admin') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const admin = await this.prisma.admin.findUnique({ where: { user_id: user.id } });

    return {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      admin_role: admin?.admin_role ?? null,
    };
  }

  async doctorLogin(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || user.role !== 'Doctor') {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const doctor = await this.prisma.doctor.findUnique({ where: { user_id: user.id } });

    return {
      id: user.id,
      doctor_id: doctor?.id ?? null,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      specialty: doctor?.specialty ?? null,
      avatar_url: user.avatar_url ?? null,
    };
  }
}
