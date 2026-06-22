import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { DoctorPatientAssignmentsService } from './doctor-patient-assignments.service';

@Controller('doctor-patient-assignments')
export class DoctorPatientAssignmentsController {
  constructor(private service: DoctorPatientAssignmentsService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}