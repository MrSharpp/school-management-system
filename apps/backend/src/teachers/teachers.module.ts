import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorDescriber } from 'src/shared/errors.service';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';

@Module({
  imports: [],
  controllers: [TeachersController],
  providers: [
    TeachersService,
    PrismaService,
    ErrorDescriber,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class TeachersModule {}
