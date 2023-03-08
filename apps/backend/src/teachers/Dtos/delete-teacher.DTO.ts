import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const deleteTeacherSchema = z.object({
  teacherId: z.number(),
});

export class DeleteTeachersDto extends createZodDto(deleteTeacherSchema) {}
