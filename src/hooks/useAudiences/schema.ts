import { z } from 'zod';

export const AudienceSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  taxonomy: z.string(),
  link: z.string()
});

export type Audience = Readonly<z.infer<typeof AudienceSchema>>;
