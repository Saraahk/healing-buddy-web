// src/doctor-requests/dto/create-doctor-request.dto.ts
import { 
  IsString, 
  IsEmail, 
  IsPhoneNumber, 
  IsInt, 
  IsOptional, 
  Min, 
  Max,
  IsNotEmpty,
  MaxLength,
  MinLength
} from 'class-validator';

export class CreateDoctorRequestDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @MaxLength(20)
  phone_number: string;

  @IsInt()
  @Min(0)
  @Max(50)
  years_of_experience: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  medical_specialty: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  medical_license_no: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  cv_document_path?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  medical_degree_document_path?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  brief_introduction?: string;
}