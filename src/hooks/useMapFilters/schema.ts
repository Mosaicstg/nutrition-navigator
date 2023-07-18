import { z } from 'zod';

export const FiltersSchema = z.object({
  'program-types': z.string().array(),
  venues: z.string().array(),
  audiences: z.string().array(),
  'organization-name': z.string(),
  address: z.string()
});
