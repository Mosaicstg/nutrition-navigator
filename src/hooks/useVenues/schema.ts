import * as v from 'valibot';

export const VenueSchema = v.object({
  id: v.number(),
  name: v.string(),
  slug: v.string(),
  taxonomy: v.string(),
  link: v.string()
});

export type Venue = Readonly<v.InferOutput<typeof VenueSchema>>;
