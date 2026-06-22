import { Module } from '@nestjs/common';
import { UploadedDocumentsService } from './uploaded-documents.service';
import { UploadedDocumentsController } from './uploaded-documents.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UploadedDocumentsController],
  providers: [UploadedDocumentsService],
})
export class UploadedDocumentsModule {}