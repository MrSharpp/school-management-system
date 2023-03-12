import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClassesService } from './classes.service';
import { AddClassDTO } from './DTOs/add-classes.DTO';
import { DeleteClassSchema } from './DTOs/delete-classes.DTO';
import { EditClassSchema } from './DTOs/edit-classes.DTO';

@Controller('/classes')
export class ClassesController {
  constructor(private classService: ClassesService) {}

  @Post()
  addClass(@Body() body: AddClassDTO) {
    return this.classService.addClass(body);
  }

  @Get()
  getClasses() {
    return this.classService.getClasses();
  }

  @Get('students/:classId/:sectionName')
  getStudentsBySecitonName(
    @Param('classId') classId,
    @Param('sectionName') sectionName
  ) {
    return this.classService.getStudentsByClass(parseInt(classId), sectionName);
  }

  @Patch(':id')
  updateClass(@Body() body: EditClassSchema, @Param('id') id) {
    console.log(body);

    return this.classService.updateClass(body, parseInt(id));
  }

  @Delete()
  deleteClass(@Body() body: DeleteClassSchema) {
    return this.classService.deleteClass(body);
  }
}
