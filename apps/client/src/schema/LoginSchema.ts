import { z } from 'zod';

const LoginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid Email' }),
  password: z.string({ required_error: 'Password is required' }).min(4),
});

export default LoginSchema;
