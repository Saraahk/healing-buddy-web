import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Post()
  create(@Body() body: any) {
    return this.patientsService.create(body);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @Get('doctor/:doctorId')
  findByDoctor(@Param('doctorId') doctorId: string) {
    return this.patientsService.findByDoctor(doctorId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.patientsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}