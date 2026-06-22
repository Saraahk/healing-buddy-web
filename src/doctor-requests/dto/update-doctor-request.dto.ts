// src/doctor-requests/dto/update-doctor-request.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateDoctorRequestDto } from './create-doctor-request.dto';
import { IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';

export class UpdateDoctorRequestDto extends PartialType(CreateDoctorRequestDto) {
  @IsOptional()
  @IsEnum(['Pending', 'Approved', 'Rejected'])
  status?: string;

  @IsOptional()
  @IsUUID()
  reviewed_by?: string;

  @IsOptional()
  @IsString()
  review_notes?: string;

  @IsOptional()
  @IsUUID()
  doctor_id?: string;
}