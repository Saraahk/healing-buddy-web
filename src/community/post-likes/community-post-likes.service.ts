import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LikePostDto } from './community-post-likes.dto';

@Injectable()
export class CommunityPostLikesService {
  constructor(private prisma: PrismaService) {}

  async likePost(dto: LikePostDto) {
    await this.prisma.communityPostLike.create({
      data: { post_id: dto.post_id, user_id: dto.user_id },
    });
    return this.prisma.communityPost.update({
      where: { id: dto.post_id },
      data: { likes_count: { increment: 1 } },
    });
  }

  async unlikePost(dto: LikePostDto) {
    await this.prisma.communityPostLike.delete({
      where: { post_id_user_id: { post_id: dto.post_id, user_id: dto.user_id } },
    });
    return this.prisma.communityPost.update({
      where: { id: dto.post_id },
      data: { likes_count: { decrement: 1 } },
    });
  }
}
