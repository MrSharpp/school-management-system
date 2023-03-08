import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const deleteStudentSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  rollNo: z.string().nonempty().optional(),
  guardianNumber: z.string().optional(),
  classId: z.string().optional(),
});

export class DeleteStudentDTO extends createZodDto(deleteStudentSchema) {}
