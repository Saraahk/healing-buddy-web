import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private service: AppointmentsService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('doctor/:doctorId')
  findByDoctor(@Param('doctorId') doctorId: string) {
    return this.service.findByDoctor(doctorId);
  }

  @Get('doctor/:doctorId/today')
  findTodayByDoctor(@Param('doctorId') doctorId: string) {
    return this.service.findTodayByDoctor(doctorId);
  }

  @Get('doctor/:doctorId/tomorrow')
  findTomorrowByDoctor(@Param('doctorId') doctorId: string) {
    return this.service.findTomorrowByDoctor(doctorId);
  }

  @Get('doctor/:doctorId/upcoming')
  findUpcomingByDoctor(@Param('doctorId') doctorId: string) {
    return this.service.findUpcomingByDoctor(doctorId);
  }

  @Get('doctor/:doctorId/previous')
  findPreviousByDoctor(@Param('doctorId') doctorId: string) {
    return this.service.findPreviousByDoctor(doctorId);
  }

  @Get('doctor/:doctorId/patients/count')
  countPatientsByDoctor(@Param('doctorId') doctorId: string) {
    return this.service.countPatientsByDoctor(doctorId);
  }

  @Get('patient/:patientId/upcoming')
  findUpcomingByPatient(@Param('patientId') patientId: string) {
    return this.service.findUpcomingByPatient(patientId);
  }

  @Get('patient/:patientId/past')
  findPastByPatient(@Param('patientId') patientId: string) {
    return this.service.findPastByPatient(patientId);
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