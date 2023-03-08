import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prismaService: PrismaService) {}

  addStudent() {}

  getAllStudent() {}

  getStudent() {}

  updateStudent() {}

  deleteStudent() {}
}
