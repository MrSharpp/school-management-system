import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorDescriber } from 'src/shared/errors.service';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';

@Module({
  imports: [],
  controllers: [TeachersController],
  providers: [TeachersService, PrismaService, ErrorDescriber],
})
export class TeachersModule {}
