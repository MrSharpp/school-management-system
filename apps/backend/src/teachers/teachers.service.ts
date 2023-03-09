import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addTeachersDTO } from './Dtos/add-teacher.DTO';
import { DeleteTeachersDto } from './Dtos/delete-teacher.DTO';
import { UpdateTeacherDto } from './Dtos/update-teacher.DTO';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/shared/constants.service';

@Injectable()
export class TeachersService {
  constructor(private prismaService: PrismaService) {}

  async addTeacher(teachersDto: addTeachersDTO): Promise<void> {
    const passwordHash = await bcrypt.hash(teachersDto.password, 10);

    await this.prismaService.teacher.create({
      data: {
        gender: teachersDto.gender,
        phoneNo: teachersDto.phoneNo,
        User: {
          create: {
            email: teachersDto.email,
            password: passwordHash,
            roll: Roles.TEACHER,
            name: teachersDto.name,
          },
        },
      },
    });
  }

  getTeacher(id: number) {
    return this.prismaService.teacher.findUnique({
      where: {
        teacherId: id,
      },
      include: {
        User: true,
      },
    });
  }

  getAllTeachers() {
    return this.prismaService.teacher.findMany({
      include: {
        User: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    });
  }

  deleteTeacher(deleteTeachersDto: DeleteTeachersDto) {
    return this.prismaService.teacher.delete({
      where: {
        teacherId: deleteTeachersDto.teacherId,
      },
    });
  }

  async updateTeacher(id: number, updateTeacherDto: UpdateTeacherDto) {
    console.log(updateTeacherDto);

    if (updateTeacherDto.User?.password)
      updateTeacherDto.User.password = await bcrypt.hash(
        updateTeacherDto.User.password,
        10
      );

    const { User, ...teacherData } = updateTeacherDto;

    return this.prismaService.teacher.update({
      where: { teacherId: id },
      data: {
        ...teacherData,
        User: {
          update: {
            ...User,
          },
        },
      },
      include: {
        User: true,
      },
    });
  }
}
