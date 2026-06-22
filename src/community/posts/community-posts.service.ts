import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto } from './community-posts.dto';

@Injectable()
export class CommunityPostsService {
  constructor(private prisma: PrismaService) {}

  async getAllPosts() {
    return this.prisma.communityPost.findMany({
      orderBy: { posted_at: 'desc' },
    });
  }

  async createPost(dto: CreatePostDto) {
    return this.prisma.communityPost.create({
      data: {
        content: dto.content,
        author_id: dto.author_id,
        author_role_at_time: dto.author_role_at_time,
      },
    });
  }

  async deletePost(id: string) {
    return this.prisma.communityPost.delete({
      where: { id },
    });
  }
}
