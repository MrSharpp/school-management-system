import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ErrorDescriber } from 'src/shared/errors.service';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';

@Module({
  imports: [],
  controllers: [StudentsController],
  providers: [PrismaService, StudentsService, ErrorDescriber],
})
export class StudentsModule {}
