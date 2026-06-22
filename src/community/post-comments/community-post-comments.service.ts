import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCommentDto } from './community-post-comments.dto';

@Injectable()
export class CommunityPostCommentsService {
  constructor(private prisma: PrismaService) {}

  async getComments(post_id: string) {
    return this.prisma.communityPostComment.findMany({
      where: { post_id },
      orderBy: { created_at: 'asc' },
    });
  }

  async createComment(dto: CreateCommentDto) {
    const comment = await this.prisma.communityPostComment.create({
      data: {
        post_id: dto.post_id,
        author_id: dto.author_id,
        comment_text: dto.comment_text,
      },
    });
    await this.prisma.communityPost.update({
      where: { id: dto.post_id },
      data: { comments_count: { increment: 1 } },
    });
    return comment;
  }

  async deleteComment(id: string) {
    return this.prisma.communityPostComment.delete({
      where: { id },
    });
  }
}
