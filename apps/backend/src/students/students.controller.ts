import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ErrorDescriber } from 'src/shared/errors.service';

@Controller('students')
@UseGuards(AuthGuard)
export class StudentsController {
  constructor(
    private studentsController: StudentsController,
    private errorDescriber: ErrorDescriber
  ) {}

  @Post()
  async addStudent() {
    this.studentsController.addStudent();
  }

  @Post()
  async editStudent() {
    this.studentsController.editStudent();
  }

  @Get()
  async getAllStudent() {
    this.studentsController.getAllStudent();
  }

  @Get(':id')
  async getStudent() {
    this.studentsController.getStudent();
  }

  @Post()
  async deleteStudent() {
    this.studentsController.deleteStudent();
  }
}
