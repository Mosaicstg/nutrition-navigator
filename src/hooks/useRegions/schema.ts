import { z } from 'zod';

export const RegionSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  taxonomy: z.string(),
  link: z.string()
});

export type Region = Readonly<z.infer<typeof RegionSchema>>;
