import { Module } from '@nestjs/common';
import { CommunityPostLikesController } from './community-post-likes.controller';
import { CommunityPostLikesService } from './community-post-likes.service';

@Module({
  controllers: [CommunityPostLikesController],
  providers: [CommunityPostLikesService]
})
export class CommunityPostLikesModule {}
