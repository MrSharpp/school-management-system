import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addTeachersDTO } from './Dtos/add-teacher.DTO';
import { DeleteTeachersDto } from './Dtos/delete-teacher.DTO';
import { UpdateTeacherDto } from './Dtos/update-teacher.DTO';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeachersService {
  constructor(private prismaService: PrismaService) {}

  async addTeacher(teachersDto: addTeachersDTO): Promise<void> {
    const passwordHash = await bcrypt.hash(teachersDto.password, 10);
    const user = await this.prismaService.user.create({
      data: {
        email: teachersDto.email,
        password: passwordHash,
        name: teachersDto.name,
      },
    });

    await this.prismaService.teacher.create({
      data: {
        gender: teachersDto.gender,
        userId: user.id,
      },
    });
  }

  getTeacher() {}

  getAllTeachers() {}

  deleteTeacher(deleteTeachersDto: DeleteTeachersDto) {}

  updateTeacher(updateTeacherDto: UpdateTeacherDto) {}
}
