import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const addStudentStudents = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  rollNo: z.string().nonempty(),
  guardianNumber: z.string().optional(),
  classId: z.string().optional(),
});

export class AddStudentDTO extends createZodDto(addStudentStudents) {}
