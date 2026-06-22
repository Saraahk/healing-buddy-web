import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UploadedDocumentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    patient_id: string;
    document_name: string;
    document_path: string;
    file_size?: number;
    document_type?: string;
    document_date: string;
    uploaded_by?: string;
    is_shared_with_family?: boolean;
    is_shared_with_doctor?: boolean;
    is_shared_with_buddy?: boolean;
  }) {
    // Check if patient exists
    const patient = await this.prisma.patient.findUnique({
      where: { id: data.patient_id }
    });
    
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${data.patient_id} not found`);
    }

    const doc = await this.prisma.uploadedDocument.create({
      data: {
        patient_id: data.patient_id,
        document_name: data.document_name,
        document_path: data.document_path,
        file_size: data.file_size ? BigInt(data.file_size) : undefined,
        document_type: data.document_type,
        document_date: new Date(data.document_date),
        uploaded_by: data.uploaded_by,
        is_shared_with_family: data.is_shared_with_family ?? false,
        is_shared_with_doctor: data.is_shared_with_doctor ?? true,
        is_shared_with_buddy: data.is_shared_with_buddy ?? true,
      },
    });

    // Convert BigInt to Number for JSON response
    return {
      ...doc,
      file_size: doc.file_size ? Number(doc.file_size) : null,
    };
  }

  async findAll() {
    const docs = await this.prisma.uploadedDocument.findMany({
      include: { patient: true, uploader: true },
    });
    
    // Convert BigInt to Number for all documents
    return docs.map(doc => ({
      ...doc,
      file_size: doc.file_size ? Number(doc.file_size) : null,
    }));
  }

  async findOne(id: string) {
    const doc = await this.prisma.uploadedDocument.findUnique({
      where: { id },
      include: { patient: true, uploader: true },
    });
    
    if (!doc) {
      throw new NotFoundException('Document not found');
    }
    
    // Convert BigInt to Number
    return {
      ...doc,
      file_size: doc.file_size ? Number(doc.file_size) : null,
    };
  }

  async update(id: string, data: Partial<{ document_name: string; document_type: string }>) {
    // Check if document exists
    await this.findOne(id);
    
    const updated = await this.prisma.uploadedDocument.update({ 
      where: { id }, 
      data 
    });
    
    // Convert BigInt to Number
    return {
      ...updated,
      file_size: updated.file_size ? Number(updated.file_size) : null,
    };
  }

  async remove(id: string) {
    // Check if document exists
    await this.findOne(id);
    
    const deleted = await this.prisma.uploadedDocument.delete({ 
      where: { id } 
    });
    
    // Convert BigInt to Number
    return {
      ...deleted,
      file_size: deleted.file_size ? Number(deleted.file_size) : null,
    };
  }
}