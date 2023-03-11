import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddStudentDTO } from './Dtos/add-student.DTO';
import { EditStudentDTO } from './Dtos/edit-student.DTO';
import { Class as SchoolClass } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private prismaService: PrismaService) {}

  async addStudent(addStudentDto: AddStudentDTO) {
    return this.prismaService.student.create({
      data: {
        name: addStudentDto.name,
        admissionNo: addStudentDto.admissionNo,
        gender: addStudentDto.gender,
        dob: addStudentDto.dob,
        guardianNumber: addStudentDto.guardianNumber || null,
        ...(addStudentDto.classId && {
          classes: {
            connect: {
              classId: addStudentDto.classId,
            },
          },
        }),
      },
    });
  }

  getAllStudent() {
    return this.prismaService.student.findMany();
  }

  getStudent(id: number) {
    return this.prismaService.student.findUnique({ where: { studentId: id } });
  }

  updateStudent(id: number, editSTudentDto: EditStudentDTO) {
    const { ...student } = editSTudentDto;
    return this.prismaService.student.update({
      where: {
        studentId: id,
      },
      data: {
        ...student,
      },
      include: {
        classes: true,
      },
    });
  }

  deleteStudent(id: number) {
    return this.prismaService.student.delete({
      where: {
        studentId: id,
      },
    });
  }
}
