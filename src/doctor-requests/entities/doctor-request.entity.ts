import { DoctorRequest } from '@prisma/client';

export class DoctorRequestEntity implements DoctorRequest {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  years_of_experience: number;
  medical_specialty: string;
  medical_license_no: string;
  cv_document_path: string | null;
  medical_degree_document_path: string | null;
  brief_introduction: string | null;
  status: string;
  reviewed_by: string | null;
  review_notes: string | null;
  reviewed_at: Date | null;
  doctor_id: string | null;
  request_date: Date;
  created_at: Date;
  updated_at: Date;
}