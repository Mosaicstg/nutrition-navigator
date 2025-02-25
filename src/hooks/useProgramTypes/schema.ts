import * as v from 'valibot';

export const ProgramTypeSchema = v.object({
  id: v.number(),
  count: v.number(),
  name: v.string(),
  slug: v.string(),
  meta: v.object({
    icon: v.string()
  }),
  link: v.string()
});

export type ProgramType = Readonly<v.InferOutput<typeof ProgramTypeSchema>>;
