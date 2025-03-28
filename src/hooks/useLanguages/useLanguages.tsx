import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../../api/fetch.ts';
import { type Language, LanguageSchema } from './schema.ts';
import * as v from 'valibot';

const fetchAllLanguages = (): Promise<Array<Language>> => {
  // There's probably NEVER going to be more than 5 or 6 so for now querying the first 100
  // suits our use case.
  return fetchApi('/wp-json/wp/v2/language?per_page=100').then((res) =>
    res.json()
  );
};

export const useLanguages = () => {
  return useQuery({
    queryKey: ['allLanguages'],
    queryFn: fetchAllLanguages,
    // Only run query on page load or component mount
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) =>
      data.filter((venue) => {
        // const validatedLanguage = LanguageSchema.safeParse(venue);
        const validatedLanguage = v.safeParse(LanguageSchema, venue);

        if (!validatedLanguage.success) {
          console.error(
            `Venue with name ${venue.name} is invalid`,
            validatedLanguage.issues
          );
        }

        return validatedLanguage.success;
      })
  });
};
