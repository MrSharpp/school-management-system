import { ApiProperty } from '@nestjs/swagger';
import { createZodDto, zodToOpenAPI } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CredentialsSchema = z.object({
  email: z.string().email('Not a valid email').describe('Email'),
  password: z.string().nonempty().describe('password'),
});

export class SignInCredentialsDto extends createZodDto(CredentialsSchema) {}
