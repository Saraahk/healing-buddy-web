// src/doctor-requests/doctor-requests.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { DoctorRequestsService } from './doctor-requests.service';
import { CreateDoctorRequestDto } from './dto/create-doctor-request.dto';
import { UpdateDoctorRequestDto } from './dto/update-doctor-request.dto';

@Controller('doctor-requests')
export class DoctorRequestsController {
  constructor(private readonly doctorRequestsService: DoctorRequestsService) {}

  @Post()
  async create(@Body() createDoctorRequestDto: CreateDoctorRequestDto) {
    return this.doctorRequestsService.create(createDoctorRequestDto);
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