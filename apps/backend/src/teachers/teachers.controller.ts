import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

import { Response } from 'express';
import { ErrorDescriber } from 'src/shared/errors.service';
import { addTeachersDTO } from './Dtos/add-teacher.DTO';
import { DeleteTeachersDto } from './Dtos/delete-teacher.DTO';
import { UpdateTeacherDto } from './Dtos/update-teacher.DTO';
import { TeachersService } from './teachers.service';

@Controller('teachers')
export class TeachersController {
  constructor(
    private teachersService: TeachersService,
    private errorDescripber: ErrorDescriber
  ) {}

  @Post()
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
            err.meta?.target
          );
          return response.status(description.status).json(description);
        })
    ).send();
  }

  @Get()
  getTeachers(@Res() response: Response) {
    this.teachersService
      .getAllTeachers()
      .then((teachers) => {
        response.status(200).json({ teachers });
      })
      .catch(() =>
        response.status(500).json({ message: 'Something went wrong!' })
      );
  }

  @Get(':id')
  getTeacher(@Param('id') id, @Res() response: Response) {
    if (!id)
      return response.status(400).json({
        message: 'Teacher id in parameter not provided or incorrect format',
      });
    this.teachersService
      .getTeacher(parseInt(id))
      .then((teacher) => response.status(200).json({ teacher }))
      .catch(() =>
        response.status(500).json({ message: 'Something went wrong!' })
      );
  }

  @Delete()
  deleteTeacher(
    @Body() deleteTeacherSchema: DeleteTeachersDto,
    @Res() response: Response
  ) {
    this.teachersService
      .deleteTeacher(deleteTeacherSchema)
      .then(() =>
        response.status(200).json({ message: 'Teacher deleted Sucessfully!' })
      )
      .catch(() =>
        response.status(500).json({ message: 'Error while deleting teacher' })
      );
  }

  @Patch(':id')
  updateTeacher(
    @Body() updateTeachersSchema: UpdateTeacherDto,
    @Param('id') id,
    @Res() response: Response
  ) {
    if (!id)
      return response.status(400).json({
        message: 'Teacher id in parameter not provided or incorrect format',
      });
    this.teachersService
      .updateTeacher(parseInt(id), updateTeachersSchema)
      .then((teacher) =>
        response
          .status(200)
          .json({ message: 'Teacher Updated Sucessfully!', teacher })
      )
      .catch((err) => response.status(500).json({ message: err.message }));
  }
}
