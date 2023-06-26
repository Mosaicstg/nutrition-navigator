import React from 'react';

// Hooks
import useVenues from '../hooks/useVenues.tsx';
import useAudiences from '../hooks/useAudiences.tsx';
import useProgramTypes from '../hooks/useProgramTypes.tsx';

// Components
import LabelCheckBox from './LabelCheckBox.tsx';

// Types
import {
  AllProgramsAction,
  AllProgramsState,
  Filters
} from '../hooks/useAllPrograms/types.ts';

type MapFiltersProps = {
  state: AllProgramsState;
  dispatch: React.Dispatch<AllProgramsAction>;
};

const MapFilters = (props: MapFiltersProps) => {
  const { state, dispatch } = props;
  const { data: programTypes, status: programsTypesStatus } = useProgramTypes();
  const { data: venues, status: venuesStatus } = useVenues();
  const { data: audiences, status: audiencesStatus } = useAudiences();

  const [isFiltersOpen, setIsFiltersIsFiltersOpen] = React.useState(false);
  const { filters } = state;

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
        isFiltersOpen ? 'nutrition-navigator__filters-wrap--open' : ''
      }`}
    >
      <div className="nutrition-navigator__filters-header-wrap">
        <div className="nutrition-navigator__address-input-wrap">
          <label htmlFor="address" className="nutrition-navigator__helper-text">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            className={`nutrition-navigator__text-field ${
              isFiltersOpen
                ? 'nutrition-navigator__text-field--filters-open'
                : ''
            }`}
          />
        </div>
        <button
          className="nutrition-navigator__button nutrition-navigator__filters-toggle-button"
          onClick={() => setIsFiltersIsFiltersOpen(!isFiltersOpen)}
          type="button"
          aria-label="Toggle Filters Window Open and Closed"
          aria-expanded={isFiltersOpen}
          aria-controls="nutrition-navigator-filters"
          id="toggle-filters"
        >
          Filters
        </button>
        <div className="nutrition-navigator__filters-reset-submit-button-group">
          <button
            className={`nutrition-navigator__button ${
              isFiltersOpen ? 'nutrition-navigator__button--white' : ''
            }`}
            onClick={() => dispatch({ type: 'UPDATE_PROGRAMS' })}
            type="button"
          >
            Search
          </button>
          <button
            className={`nutrition-navigator__button nutrition-navigator__button--outline ${
              isFiltersOpen ? 'nutrition-navigator__button--green' : ''
            }`}
            onClick={() => dispatch({ type: 'RESET' })}
            type="button"
          >
            Reset
          </button>
        </div>
      </div>
      <div
        id="nutrition-navigator-filters"
        className="nutrition-navigator__filters-body-wrap"
        aria-labelledby="toggle-filters"
        aria-hidden={!isFiltersOpen}
        hidden={!isFiltersOpen}
      >
        <div className={'nutrition-navigator__program-types-body-wrap'}>
          <h2 className="nutrition-navigator__heading--h2">I want to...</h2>
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
                      checked={filters['program-types'].includes(slug)}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="nutrition-navigator__sub-filters">
          <h2 className="nutrition-navigator__heading--h3">
            More Ways To Search:
          </h2>
          <div className="nutrition-navigator__filters-grid">
            <details className="nutrition-navigator__filter-details" open>
              <summary>
                <h5 className="nutrition-navigator__heading--h5">
                  By Venues (Select All That Apply)
                </h5>
              </summary>
              <ul className="nutrition-navigator__checkbox-items-wrap">
                {venuesStatus === 'success' &&
                  venues.map((venue) => {
                    return (
                      <li
                        className="nutrition-navigator__checkbox-wrap"
                        key={venue.id}
                      >
                        <LabelCheckBox
                          {...{
                            label: venue.name,
                            name: 'audience[]',
                            value: venue.slug,
                            onChange: onVenueChange,
                            isChecked: filters.venues.includes(venue.slug)
                          }}
                        />
                      </li>
                    );
                  })}
              </ul>
            </details>
            <details className="nutrition-navigator__filter-details" open>
              <summary>
                <h5 className="nutrition-navigator__heading--h5">
                  By Audience (Select All That Apply)
                </h5>
              </summary>
              <ul className="nutrition-navigator__checkbox-items-wrap">
                {audiencesStatus === 'success' &&
                  audiences.map((audience) => {
                    return (
                      <li
                        className="nutrition-navigator__checkbox-wrap"
                        key={audience.id}
                      >
                        <LabelCheckBox
                          {...{
                            label: audience.name,
                            name: 'audience[]',
                            value: audience.slug,
                            onChange: onAudienceChange,
                            isChecked: filters.audiences.includes(audience.slug)
                          }}
                        />
                      </li>
                    );
                  })}
              </ul>
            </details>
            <details className="nutrition-navigator__filter-details" open>
              <summary>
                <h5 className="nutrition-navigator__heading--h5">
                  By Organization
                </h5>
              </summary>
              <div className="nutrition-navigator__organization-name-search-field-wrap">
                <label
                  htmlFor="organization-name"
                  className="nutrition-navigator__helper-text"
                >
                  Search Organization Name
                </label>
                <input
                  type="text"
                  placeholder="Search Name"
                  name="organization-name"
                  className="nutrition-navigator__text-field"
                  onChange={onOrgNameChange}
                />
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapFilters;
