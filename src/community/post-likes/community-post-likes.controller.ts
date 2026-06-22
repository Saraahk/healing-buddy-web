import { Controller, Post, Delete, Body } from '@nestjs/common';
import { CommunityPostLikesService } from './community-post-likes.service';
import { LikePostDto } from './community-post-likes.dto';

@Controller('community-post-likes')
export class CommunityPostLikesController {
  constructor(private likesService: CommunityPostLikesService) {}

  @Post()
  likePost(@Body() dto: LikePostDto) {
    return this.likesService.likePost(dto);
  }

  @Delete()
  unlikePost(@Body() dto: LikePostDto) {
    return this.likesService.unlikePost(dto);
  }
}
