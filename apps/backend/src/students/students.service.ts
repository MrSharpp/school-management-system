import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddStudentDTO } from './Dtos/add-student.DTO';
import { DeleteStudentDTO } from './Dtos/delete-student.DTO';
import { EditStudentDTO } from './Dtos/edit-student.DTO';

@Injectable()
export class StudentsService {
  constructor(private prismaService: PrismaService) {}

  addStudent(addStudentDto: AddStudentDTO) {
    const { email, guardianNumber, ...student } = addStudentDto;

    return this.prismaService.student.create({
      data: {
        name: student.name,
        rollNo: student.rollNo,
        ...(guardianNumber && { guardianNumber }),
        ...(email && { email }),
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
    const { classIds, ...student } = editSTudentDto;
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
