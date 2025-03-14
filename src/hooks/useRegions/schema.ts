import * as v from 'valibot';

export const RegionSchema = v.object({
  id: v.number(),
  name: v.string(),
  slug: v.string(),
  taxonomy: v.string(),
  link: v.string()
});

export type Region = Readonly<v.InferOutput<typeof RegionSchema>>;
