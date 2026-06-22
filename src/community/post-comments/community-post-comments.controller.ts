import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CommunityPostCommentsService } from './community-post-comments.service';
import { CreateCommentDto } from './community-post-comments.dto';

@Controller('community-post-comments')
export class CommunityPostCommentsController {
  constructor(private commentsService: CommunityPostCommentsService) {}

  @Get(':post_id')
  getComments(@Param('post_id') post_id: string) {
    return this.commentsService.getComments(post_id);
  }

  @Post()
  createComment(@Body() dto: CreateCommentDto) {
    return this.commentsService.createComment(dto);
  }

  @Delete(':id')
  deleteComment(@Param('id') id: string) {
    return this.commentsService.deleteComment(id);
  }
}
