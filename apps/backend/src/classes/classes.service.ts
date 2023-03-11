import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddClassDTO } from './DTOs/add-classes.DTO';
import { DeleteClassSchema } from './DTOs/delete-classes.DTO';
import { EditClassSchema } from './DTOs/edit-classes.DTO';

@Injectable()
export class ClassesService {
  constructor(private pSerbice: PrismaService) {}

  addClass(body: AddClassDTO) {
    return this.pSerbice.class.create({
      data: {
        className: body.className,
        section: body.section,
      },
    });
  }

  getClassStudents(classId: number) {
    return this.pSerbice.class.findMany({
      where: {
        classId: classId,
      },
      include: {
        students: true,
      },
    });
  }

  getClasses() {
    return this.pSerbice.class.findMany({ include: { students: true } });
  }

  updateClass(body: EditClassSchema, id: number) {
    return this.pSerbice.class.update({
      where: {
        classId: id,
      },
      data: {
        ...body,
      },
    });
  }

  deleteClass(body: DeleteClassSchema) {
    return this.pSerbice.class.delete({
      where: {
        classId: body.classId,
      },
    });
  }
}
