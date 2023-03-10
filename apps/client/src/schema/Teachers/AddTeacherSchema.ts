import { z } from 'zod';

const AddTeachersSchema = z.object({
  name: z.string().describe('Full Name of the teacher'),
  email: z.string().email().describe('Email'),
  password: z.string().describe('Password'),
  gender: z.enum(['Male', 'Female']),
});

export type IAddTeacherSchema = z.infer<typeof AddTeachersSchema>;

export default AddTeachersSchema;
