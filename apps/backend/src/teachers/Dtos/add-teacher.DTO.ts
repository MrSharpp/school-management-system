import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const addTeachersSchema = z.object({
  name: z.string().describe('Full Name of the teacher'),
  email: z.string().email().describe('Email'),
  password: z.string().describe('Password'),
  phoneNo: z.string(),
  gender: z.union([z.literal('Male'), z.literal('Female')]),
});

export class addTeachersDTO extends createZodDto(addTeachersSchema) {}
