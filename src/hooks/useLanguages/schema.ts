import * as v from 'valibot';

export const LanguageSchema = v.object({
  id: v.number(),
  name: v.string(),
  slug: v.string(),
  taxonomy: v.string(),
  link: v.pipe(v.string(), v.url())
});

export type Language = Readonly<v.InferOutput<typeof LanguageSchema>>;
