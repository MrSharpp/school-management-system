import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(
    userWhereUnique: Prisma.UserWhereUniqueInput
  ): Promise<User | undefined> {
    return this.prisma.user.findUnique({ where: userWhereUnique });
  }
}
