import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const deleteTeacherSchema = z.object({
  teacherId: z.string(),
});

export class DeleteTeachersDto extends createZodDto(deleteTeacherSchema) {}
