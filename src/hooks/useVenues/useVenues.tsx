import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../../api/fetch.ts';
import { Venue, VenueSchema } from './schema.ts';

const fetchAllVenues = (): Promise<Venue[]> => {
  // There's probably NEVER going to be more than 5 or 6 so for now querying the first 100
  // suits our use case.
  return fetchApi('/wp-json/wp/v2/venue?per_page=100').then((res) =>
    res.json()
  );
};

const useVenues = () => {
  return useQuery({
    queryKey: ['allVenues'],
    queryFn: fetchAllVenues,
    // Only run query on page load or component mount
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) =>
      data.filter((venue) => {
        const validatedVenue = VenueSchema.safeParse(venue);

        if (!validatedVenue.success) {
          console.error(
            `Venue with name ${venue.name} is invalid`,
            validatedVenue.error
          );
        }

        return validatedVenue.success;
      })
  });
};

export default useVenues;
