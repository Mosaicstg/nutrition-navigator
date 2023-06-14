import React from 'react';

// Hooks
import useVenues from '../hooks/useVenues.tsx';
import useAudiences from '../hooks/useAudiences.tsx';
import useProgramTypes from '../hooks/useProgramTypes.tsx';

// Types
import { AllProgramsAction, AllProgramsState, Filters } from '../types.ts';

type MapFiltersProps = {
  state: AllProgramsState;
  dispatch: React.Dispatch<AllProgramsAction>;
};

const MapFilters = (props: MapFiltersProps) => {
  const { state, dispatch } = props;
  const { data: programTypes, status: programsTypesStatus } = useProgramTypes();
  const { data: venues, status: venuesStatus } = useVenues();
  const { data: audiences, status: audiencesStatus } = useAudiences();

  const [open, setOpen] = React.useState(false);

  const onProgramTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { filters: prevFilters } = state;
    const { 'program-types': programTypes } = prevFilters;

    const newFilters = {
      ...prevFilters,
      'program-types': programTypes.includes(event.target.value)
        ? programTypes.filter(
            (programType) => event.target.value !== programType
          )
        : [...programTypes, event.target.value]
    };

    dispatch({ type: 'UPDATE_FILTERS', data: newFilters });
  };

  const onVenueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { filters: prevFilters } = state;
    const { venues } = prevFilters;

    const newFilters = {
      ...prevFilters,
      venues: venues.includes(event.target.value)
        ? venues.filter((venue) => event.target.value !== venue)
        : [...venues, event.target.value]
    };

    dispatch({ type: 'UPDATE_FILTERS', data: newFilters });
  };

  const onAudienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { filters: prevFilters } = state;
    const { audiences } = prevFilters;

    const newFilters = {
      ...prevFilters,
      audiences: audiences.includes(event.target.value)
        ? audiences.filter((audience) => event.target.value !== audience)
        : [...audiences, event.target.value]
    };

    dispatch({ type: 'UPDATE_FILTERS', data: newFilters });
  };

  const onOrgNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { filters: prevFilters } = state;

    const newFilters: Filters = {
      ...prevFilters,
      'organization-name': event.target.value
    };

    dispatch({ type: 'UPDATE_FILTERS', data: newFilters });
  };

  return (
    <div
      className={`nutrition-navigator__filters-wrap ${
        open ? 'nutrition-navigator__filters-wrap--open' : ''
      }`}
    >
      <div className="nutrition-navigator__filters-header-wrap">
        <input type="text" name="address" />
        <button onClick={() => setOpen(!open)} type="button">
          Filters
        </button>
        <button onClick={() => dispatch({ type: 'RESET' })} type="button">
          Reset
        </button>
        <button
          onClick={() => dispatch({ type: 'UPDATE_PROGRAMS' })}
          type="button"
        >
          Search
        </button>
      </div>
      {open && (
        <div className={'nutrition-navigator__filters-body-wrap'}>
          <div className={'nutrition-navigator__program-types-body-wrap'}>
            <h2>I want to...</h2>
            <ul
              className={
                'nutrition-navigator__checkbox-items-wrap nutrition-navigator__program-types'
              }
            >
              {programsTypesStatus === 'success' &&
                programTypes.map(({ name, slug, meta: { icon } }, index) => {
                  return (
                    <li
                      className="nutrition-navigator__checkbox-wrap"
                      key={index}
                    >
                      <label
                        className="nutrition-navigator__checkbox-label"
                        htmlFor={slug}
                      >
                        {icon ? (
                          <img
                            src={icon}
                            className={
                              'nutrition-navigator__checkbox-label-icon nutrition-navigator__program-type-icon'
                            }
                            alt={`Icon for ${name}`}
                          />
                        ) : (
                          ''
                        )}
                        {name}
                      </label>
                      <input
                        type="checkbox"
                        name="program-type[]"
                        value={slug}
                        id={slug}
                        className="nutrition-navigator__checkbox"
                        onChange={onProgramTypeChange}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="nutrition-navigator__filters-grid">
            <details className="nutrition-navigator__filter-details" open>
              <summary>
                <h4>By Venues (Select All That Apply)</h4>
              </summary>
              <ul className="nutrition-navigator__checkbox-items-wrap">
                {venuesStatus === 'success' &&
                  venues.map((venue, index) => {
                    return (
                      <li
                        className="nutrition-navigator__checkbox-wrap"
                        key={index}
                      >
                        <label
                          className="nutrition-navigator__checkbox-label"
                          htmlFor={venue.slug}
                        >
                          {venue.name}
                        </label>
                        <input
                          type="checkbox"
                          name="venue[]"
                          value={venue.slug}
                          id={venue.slug}
                          className="nutrition-navigator__checkbox"
                          onChange={onVenueChange}
                        />
                      </li>
                    );
                  })}
              </ul>
            </details>
            <details className="nutrition-navigator__filter-details" open>
              <summary>
                <h4>By Audience (Select All That Apply)</h4>
              </summary>
              <ul className="nutrition-navigator__checkbox-items-wrap">
                {audiencesStatus === 'success' &&
                  audiences.map((audience, index) => {
                    return (
                      <li
                        className="nutrition-navigator__checkbox-wrap"
                        key={index}
                      >
                        <label
                          className="nutrition-navigator__checkbox-label"
                          htmlFor={audience.slug}
                        >
                          {audience.name}
                        </label>
                        <input
                          type="checkbox"
                          name="audience[]"
                          value={audience.slug}
                          id={audience.slug}
                          className="nutrition-navigator__checkbox"
                          onChange={onAudienceChange}
                        />
                      </li>
                    );
                  })}
              </ul>
            </details>
            <details className="nutrition-navigator__filter-details" open>
              <summary>
                <h4>By Organization</h4>
              </summary>
              <input
                type="text"
                placeholder="Search Name"
                name="organization-name"
                onChange={onOrgNameChange}
              />
            </details>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapFilters;
