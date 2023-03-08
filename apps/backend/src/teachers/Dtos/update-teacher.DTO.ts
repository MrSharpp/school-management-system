import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const updateTeacherDto = z.object({
  gender: z.union([z.literal('Male'), z.literal('Female')]).optional(),
  User: z
    .object({
      password: z.string().optional(),
      email: z.string().email().optional(),
      name: z.string().optional(),
    })
    .optional(),
});

export class UpdateTeacherDto extends createZodDto(updateTeacherDto) {}
