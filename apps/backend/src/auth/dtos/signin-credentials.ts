import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CredentialsSchema = z.object({
  email: z.string().email('Not a valid email'),
  password: z.string().nonempty(),
});

export class SignInCredentialsDto extends createZodDto(CredentialsSchema) {}
