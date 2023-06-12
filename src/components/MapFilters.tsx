import useVenues from '../hooks/useVenues.tsx';
import useAudiences from '../hooks/useAudiences.tsx';
import { FormEvent, useState, Dispatch, SetStateAction } from 'react';
import { Filters } from '../types.ts';

const MapFilters = (props: {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
}) => {
  const { filters, setFilters } = props;
  const [open, setOpen] = useState(true);
  const { data: venues, status: venuesStatus } = useVenues();
  const { data: audiences, status: audiencesStatus } = useAudiences();

  const onProgramTypeChange = (event: FormEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => {
      const { 'program-types': programTypes } = prevFilters;

      return {
        ...prevFilters,
        'program-type': programTypes.includes(event.currentTarget.value)
          ? programTypes.filter(
              (programType) => event.currentTarget.value !== programType
            )
          : [...programTypes, event.currentTarget.value]
      };
    });
  };

  const onVenueChange = (event: FormEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => {
      const { venues } = prevFilters;

      return {
        ...prevFilters,
        venues: venues.includes(event.currentTarget.value)
          ? venues.filter((venue) => event.currentTarget.value !== venue)
          : [...venues, event.currentTarget.value]
      };
    });
  };

  return (
    <div
      className={`nutrition-navigator__filters-wrap ${
        open ? 'nutrition-navigator__filters-wrap--open' : ''
      }`}
    >
      {open && (
        <div className={'nutrition-navigator__filters-body-wrap'}>
          <h4>By Venues (Select All That Apply)</h4>
          <ul>
            {venuesStatus === 'success' &&
              venues.map((venue, index) => {
                return (
                  <li key={index}>
                    <label htmlFor={venue.slug}>{venue.name}</label>
                    <input
                      type="checkbox"
                      name="venue[]"
                      value={venue.slug}
                      id={venue.slug}
                    />
                  </li>
                );
              })}
          </ul>
          <h4>By Audience (Select All That Apply)</h4>
          <ul>
            {audiencesStatus === 'success' &&
              audiences.map((audience, index) => {
                return (
                  <li key={index}>
                    <label htmlFor={audience.slug}>{audience.name}</label>
                    <input
                      type="checkbox"
                      name="audience[]"
                      value={audience.slug}
                      id={audience.slug}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MapFilters;
