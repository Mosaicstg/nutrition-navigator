import { z } from 'zod';

export const VenueSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  taxonomy: z.string(),
  link: z.string()
});

export type Venue = z.infer<typeof VenueSchema>;
