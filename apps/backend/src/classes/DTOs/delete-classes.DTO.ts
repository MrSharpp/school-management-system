import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const deleteClassSchema = z.object({
  classId: z.string().transform((val) => parseInt(val)),
});

export class DeleteClassSchema extends createZodDto(deleteClassSchema) {}
