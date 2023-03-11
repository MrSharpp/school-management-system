import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const editStudentShema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  admissionNo: z.string().nonempty().optional(),
  gender: z.enum(['Male', 'Female']).optional(),
  dob: z.string().nonempty().optional(),
  guardianNumber: z.string().nonempty().optional(),
  classIds: z.string().array().optional(),
});

export class EditStudentDTO extends createZodDto(editStudentShema) {}
