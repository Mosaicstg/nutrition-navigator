import { z } from 'zod';

export const MetroAreaSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  taxonomy: z.string(),
  link: z.string()
});

export type MetroArea = Readonly<z.infer<typeof MetroAreaSchema>>;
