import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const deleteStudentSchema = z.object({
  id: z.number(),
});

export class DeleteStudentDTO extends createZodDto(deleteStudentSchema) {}
