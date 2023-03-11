import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const addClassSchema = z.object({
  className: z.string(),
});

export class AddClassDTO extends createZodDto(addClassSchema) {}
