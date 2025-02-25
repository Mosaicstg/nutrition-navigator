import { pipe, number, string, object, url, InferOutput } from 'valibot';

export const AudienceSchema = object({
  id: number(),
  name: string(),
  slug: string(),
  taxonomy: string(),
  link: pipe(string(), url())
});

export type Audience = Readonly<InferOutput<typeof AudienceSchema>>;
