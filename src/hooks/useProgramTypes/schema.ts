import { z } from 'zod';

export const ProgramTypeSchema = z.object({
  id: z.number(),
  count: z.number(),
  name: z.string(),
  slug: z.string(),
  meta: z.object({
    icon: z.string()
  }),
  link: z.string()
});

export type ProgramType = Readonly<z.infer<typeof ProgramTypeSchema>>;
