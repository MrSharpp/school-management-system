import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { send } from 'process';
import { ErrorDescriber } from 'src/shared/errors.service';
import { addTeachersDTO } from './Dtos/add-teacher.DTO';
import { DeleteTeachersDto } from './Dtos/delete-teacher.DTO';
import { UpdateTeacherDto } from './Dtos/update-teacher.DTO';
import { TeachersService } from './teachers.service';

@Controller()
export class TeachersController {
  constructor(
    private teachersService: TeachersService,
    private errorDescripber: ErrorDescriber
  ) {}

  @Post('/teachers')
  async addTeacher(
    @Body() teahcersSchema: addTeachersDTO,
    @Res() response: Response
  ) {
    (
      await this.teachersService
        .addTeacher(teahcersSchema)
        .then(() => response.status(200))
        .catch((err) => {
          const description = this.errorDescripber.getErrorDescription(
            err.code,
            err.meta.target
          );
          return response.status(description.status).json(description);
        })
    ).send();
  }

  @Get('/teachers')
  getTeachers() {
    this.teachersService.getAllTeachers();
  }

  @Get('/teachers/:id')
  getTeacher() {
    this.teachersService.getAllTeachers();
  }

  @Delete('/teachers')
  deleteTeacher(@Body() deleteTeacherSchema: DeleteTeachersDto) {
    this.teachersService.deleteTeacher(deleteTeacherSchema);
  }

  @Patch('/teachers')
  updateTeacher(@Body() updateTeachersSchema: UpdateTeacherDto) {
    this.teachersService.updateTeacher(updateTeachersSchema);
  }
}
