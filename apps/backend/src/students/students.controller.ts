import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ErrorDescriber } from 'src/shared/errors.service';
import { AddStudentDTO } from './Dtos/add-student.DTO';
import { EditStudentDTO } from './Dtos/edit-student.DTO';
import { StudentsService } from './students.service';

@Controller('students')
@UseGuards(AuthGuard)
export class StudentsController {
  constructor(
    private studentsService: StudentsService,
    private errorDescriber: ErrorDescriber
  ) {}

  @Post()
  async addStudent(
    @Body() addStudentDto: AddStudentDTO,
    @Res() response: Response
  ) {
    this.studentsService
      .addStudent(addStudentDto)
      .then((student) => response.status(200).json({ student }))
      .catch((err) =>
        response
          .status(500)
          .json({ message: 'Something went wrong!', error: err.message })
      );
  }

  @Patch(':id')
  async editStudent(
    @Param('id') id,
    @Body() editSTudentDto: EditStudentDTO,
    @Res() response: Response
  ) {
    this.studentsService
      .updateStudent(parseInt(id), editSTudentDto)
      .then((student) => response.status(200).json({ student }))
      .catch((err) =>
        response
          .status(500)
          .json({ message: 'Something went wrong!', error: err.message })
      );
  }

  @Get()
  async getAllStudent(@Res() response: Response) {
    this.studentsService
      .getAllStudent()
      .then((student) => response.status(200).json({ student }))
      .catch((err) =>
        response
          .status(500)
          .json({ message: 'Something went wrong!', error: err.message })
      );
  }

  @Get(':id')
  async getStudent(@Param('id') id, @Res() response: Response) {
    this.studentsService
      .getStudent(parseInt(id))
      .then((student) => response.status(200).json({ student }))
      .catch((err) =>
        response
          .status(500)
          .json({ message: 'Something went wrong!', error: err.message })
      );
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id, @Res() response: Response) {
    this.studentsService
      .deleteStudent(parseInt(id))
      .then((student) => response.status(200).json({ student }))
      .catch((err) =>
        response
          .status(500)
          .json({ message: 'Something went wrong!', error: err.message })
      );
  }
}
