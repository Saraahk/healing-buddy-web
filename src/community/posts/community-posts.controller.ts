import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CommunityPostsService } from './community-posts.service';
import { CreatePostDto } from './community-posts.dto';

@Controller('community-posts')
export class CommunityPostsController {
  constructor(private communityPostsService: CommunityPostsService) {}

  @Get()
  getAllPosts() {
    return this.communityPostsService.getAllPosts();
  }

  @Post()
  createPost(@Body() dto: CreatePostDto) {
    return this.communityPostsService.createPost(dto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.communityPostsService.deletePost(id);
  }
}
