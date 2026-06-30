// src/doctor-requests/doctor-requests.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { DoctorRequestsService } from './doctor-requests.service';
import { CreateDoctorRequestDto } from './dto/create-doctor-request.dto';
import { UpdateDoctorRequestDto } from './dto/update-doctor-request.dto';

const storage = diskStorage({
  destination: './uploads/avatars',
  filename: (_req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + extname(file.originalname));
  },
});

const ALLOWED = ['image/jpeg','image/png','image/webp','application/pdf','application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

@Controller('doctor-requests')
export class DoctorRequestsController {
  constructor(private readonly doctorRequestsService: DoctorRequestsService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'avatar', maxCount: 1 },
        { name: 'cv',     maxCount: 1 },
        { name: 'degree', maxCount: 1 },
      ],
      {
        storage,
        limits: { fileSize: 10 * 1024 * 1024 },
        fileFilter: (_req, file, cb) => {
          cb(null, ALLOWED.includes(file.mimetype));
        },
      },
    ),
  )
  async create(
    @Body() body: any,
    @UploadedFiles() files: { avatar?: any[]; cv?: any[]; degree?: any[] },
  ) {
    const dto: CreateDoctorRequestDto = {
      full_name:                   body.full_name,
      email:                       body.email,
      phone_number:                body.phone_number,
      medical_specialty:           body.medical_specialty,
      medical_license_no:          body.medical_license_no,
      years_of_experience:         Number(body.years_of_experience),
      brief_introduction:          body.brief_introduction,
      avatar_url:                  files?.avatar?.[0] ? `/uploads/avatars/${files.avatar[0].filename}` : undefined,
      cv_document_path:            files?.cv?.[0]     ? `/uploads/avatars/${files.cv[0].filename}`     : undefined,
      medical_degree_document_path: files?.degree?.[0] ? `/uploads/avatars/${files.degree[0].filename}` : undefined,
    };
    return this.doctorRequestsService.create(dto);
  }

  @Get()
  findAll() {
    return this.doctorRequestsService.findAll();
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.doctorRequestsService.findByStatus(status);
  }

  @Get('count/pending')
  async getPendingCount() {
    const count = await this.doctorRequestsService.getPendingCount();
    return { count };
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.doctorRequestsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDoctorRequestDto: UpdateDoctorRequestDto,
  ) {
    return this.doctorRequestsService.update(id, updateDoctorRequestDto);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  async approve(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { reviewer_id: string; review_notes?: string },
  ) {
    return this.doctorRequestsService.approve(id, body.reviewer_id, body.review_notes);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  async reject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { reviewer_id: string; review_notes?: string },
  ) {
    return this.doctorRequestsService.reject(id, body.reviewer_id, body.review_notes);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.doctorRequestsService.remove(id);
  }
}
