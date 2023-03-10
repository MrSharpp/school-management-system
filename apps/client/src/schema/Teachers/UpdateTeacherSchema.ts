import { z } from 'zod';

const UpdateTeacherSchema = z.object({
  gender: z.enum(['Male', 'Female']).optional(),
  
  User: z
    .object({
      password: z.string().optional(),
      email: z.string().email().optional(),
      name: z.string().optional(),
    })
    .optional(),
});

export type IUpdateTeacherSchema = z.infer<typeof UpdateTeacherSchema>;

export default UpdateTeacherSchema;
