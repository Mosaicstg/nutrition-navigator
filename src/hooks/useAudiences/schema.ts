import { z } from 'zod';
import { number, string, object, url } from 'valibot';

export const AudienceSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  taxonomy: z.string(),
  link: z.string()
});

export const Audience = object({
  id: number(),
  name: string(),
  slug: string(),
  taxonomy: string(),
  link: string([url()])
});

export type Audience = Readonly<z.infer<typeof AudienceSchema>>;
