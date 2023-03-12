import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const editClassSchema = z.object({
  className: z.string().optional(),
  sections: z.array(z.string()),
});

export class EditClassSchema extends createZodDto(editClassSchema) {}
