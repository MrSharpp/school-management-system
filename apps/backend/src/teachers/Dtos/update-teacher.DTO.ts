import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const updateTeacherDto = z.object({
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  gender: z.union([z.literal('Male'), z.literal('Female')]).optional(),
});

export class UpdateTeacherDto extends createZodDto(updateTeacherDto) {}
