import * as v from 'valibot';

export const AudienceSchema = v.object({
  id: v.number(),
  name: v.string(),
  slug: v.string(),
  taxonomy: v.string(),
  link: v.pipe(v.string(), v.url())
});

export type Audience = Readonly<v.InferOutput<typeof AudienceSchema>>;
