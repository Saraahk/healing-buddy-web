import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { HealingBuddyService } from './healing-buddy.service';

@Controller('healing-buddy')
export class HealingBuddyController {
  constructor(private healingBuddyService: HealingBuddyService) {}

  @Post()
  create(@Body() body: any) {
    return this.healingBuddyService.create(body);
  }

  @Get()
  findAll() {
    return this.healingBuddyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healingBuddyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.healingBuddyService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healingBuddyService.remove(id);
  }
}