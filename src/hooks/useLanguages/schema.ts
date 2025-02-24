import { z } from 'zod';
import { number, object, string, url } from 'valibot';

export const LanguageSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  taxonomy: z.string(),
  link: z.string()
});

export const Language = object({
  id: number(),
  name: string(),
  slug: string(),
  taxonomy: string(),
  link: string([url()])
});

export type Language = Readonly<z.infer<typeof LanguageSchema>>;
