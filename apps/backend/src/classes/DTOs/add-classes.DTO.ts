import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const addClassSchema = z.object({
  className: z.string(),
  sections: z.array(z.string()).transform((val) => val.join(',')),
});

export class AddClassDTO extends createZodDto(addClassSchema) {}
