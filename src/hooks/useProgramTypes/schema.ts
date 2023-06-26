import { z } from 'zod';

// eslint-disable-next-line react-refresh/only-export-components
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

export type ProgramType = z.infer<typeof ProgramTypeSchema>;
