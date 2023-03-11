import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const addStudentStudents = z.object({
  name: z.string().nonempty(),
  admissionNo: z.string().nonempty(),
  gender: z.enum(['Male', 'Female']),
  dob: z.dateString(),
  guardianNumber: z.string().optional(),
  classId: z.string().optional(),
});

export class AddStudentDTO extends createZodDto(addStudentStudents) {}
