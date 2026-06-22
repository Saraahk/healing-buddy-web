import { Module } from '@nestjs/common';
import { CommunityPostCommentsController } from './community-post-comments.controller';
import { CommunityPostCommentsService } from './community-post-comments.service';

@Module({
  controllers: [CommunityPostCommentsController],
  providers: [CommunityPostCommentsService]
})
export class CommunityPostCommentsModule {}
