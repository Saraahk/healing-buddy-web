import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { FamilyMembersService } from './family-members.service';

@Controller('family-members')
export class FamilyMembersController {
  constructor(private familyMembersService: FamilyMembersService) {}

  @Post()
  create(@Body() body: any) {
    return this.familyMembersService.create(body);
  }

  @Get()
  findAll() {
    return this.familyMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familyMembersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.familyMembersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familyMembersService.remove(id);
  }
}