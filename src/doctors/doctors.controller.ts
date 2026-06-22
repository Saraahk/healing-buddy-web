import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
  constructor(private doctorsService: DoctorsService) {}

  @Post()
  create(@Body() body: any) {
    return this.doctorsService.create(body);
  }

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.doctorsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(id);
  }
}