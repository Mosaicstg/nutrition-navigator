import { z } from 'zod';

export const LanguageSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  taxonomy: z.string(),
  link: z.string()
});

export type Language = Readonly<z.infer<typeof LanguageSchema>>;
