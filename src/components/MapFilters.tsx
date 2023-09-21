import React from 'react';
import { decode } from 'html-entities';

// Hooks
import useProgramTypes from '../hooks/useProgramTypes/useProgramTypes.tsx';
import useVenues from '../hooks/useVenues/useVenues.tsx';
import useAudiences from '../hooks/useAudiences/useAudiences.tsx';
import useMetroAreas from '../hooks/useMetroAreas/useMetroAreas.tsx';
import {
  defaultFilters,
  Filters,
  useMapFilters
} from '../hooks/useMapFilters/useMapFilters.tsx';

// Components
import LabelCheckBox from './LabelCheckBox.tsx';

// Types
import {
  AllProgramsDispatch,
  AllProgramsState
} from '../hooks/useAllPrograms/types.ts';
import useLanguages from '../hooks/useLanguages/useLanguages.tsx';

type MapFiltersProps = {
  state: AllProgramsState;
  dispatch: AllProgramsDispatch;
};

const MapFilters = (props: MapFiltersProps) => {
  const { state, dispatch } = props;

  const [filters, setLocalFilters] = useMapFilters();
  const { data: programTypes, status: programsTypesStatus } = useProgramTypes();
  const { data: languages, status: languagesStatus } = useLanguages();
  const { data: venues, status: venuesStatus } = useVenues();
  const { data: audiences, status: audiencesStatus } = useAudiences();
  const { data: metroAreas, status: metroAreaStatus } = useMetroAreas();

  const [isFiltersOpen, setIsFiltersIsFiltersOpen] = React.useState(false);
  const { programs } = state;

  const onAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prevFilters = filters;
    const zipCode = event.target.value;

    const newFilters: Filters = {
      ...prevFilters,
      address: zipCode
    };

    setLocalFilters(() => newFilters);
  };

  const onMetroAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prevFilters = filters;
    const { 'metro-areas': metroAreas } = prevFilters;

    const newFilters = {
      ...prevFilters,
      'metro-areas': metroAreas.includes(event.target.value)
        ? metroAreas.filter((metroArea) => event.target.value !== metroArea)
        : [...metroAreas, event.target.value]
    };

    setLocalFilters(() => newFilters);
  };

  const onProgramTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prevFilters = filters;
    const { 'program-types': programTypes } = prevFilters;

    const newFilters = {
      ...prevFilters,
      'program-types': programTypes.includes(event.target.value)
        ? programTypes.filter(
            (programType) => event.target.value !== programType
          )
        : [...programTypes, event.target.value]
    };

    setLocalFilters(() => newFilters);
  };

  const onLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prevFilters = filters;
    const { languages } = prevFilters;

    const newFilters = {
      ...prevFilters,
      languages: languages.includes(event.target.value)
        ? languages.filter((language) => event.target.value !== language)
        : [...languages, event.target.value]
    };

    setLocalFilters(() => newFilters);
  };

  const onVenueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prevFilters = filters;
    const { venues } = prevFilters;

    const newFilters = {
      ...prevFilters,
      venues: venues.includes(event.target.value)
        ? venues.filter((venue) => event.target.value !== venue)
        : [...venues, event.target.value]
    };

    setLocalFilters(() => newFilters);
  };

  const onAudienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prevFilters = filters;
    const { audiences } = prevFilters;

    const newFilters = {
      ...prevFilters,
      audiences: audiences.includes(event.target.value)
        ? audiences.filter((audience) => event.target.value !== audience)
        : [...audiences, event.target.value]
    };

    setLocalFilters(() => newFilters);
  };

  const onOrgNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prevFilters = filters;

    const newFilters: Filters = {
      ...prevFilters,
      'organization-name': event.target.value
    };

    setLocalFilters(() => newFilters);
  };

  const onSearchButtonClick = () => {
    dispatch({ type: 'UPDATE_PROGRAMS', filters });

    // Close Filters window
    setIsFiltersIsFiltersOpen(false);
  };

  const onResetButtonClick = () => {
    setLocalFilters(() => defaultFilters);

    dispatch({ type: 'RESET' });
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
            placeholder="Enter a Zip Code"
            className={`nutrition-navigator__text-field ${
              isFiltersOpen
                ? 'nutrition-navigator__text-field--filters-open'
                : ''
            }`}
            value={filters.address}
            onChange={onAddressChange}
            autoComplete="true"
            readOnly={programs.length === 0}
          />
        </div>
        <div
          className={`nutrition-navigator__filters-button-grid-body-wrap ${
            isFiltersOpen
              ? 'nutrition-navigator__filters-button-grid-body-wrap--open'
              : ''
          }`}
        >
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
          <div
            id="nutrition-navigator-filters"
            className="nutrition-navigator__filters-body-wrap"
            aria-labelledby="toggle-filters"
            aria-hidden={!isFiltersOpen}
            hidden={!isFiltersOpen}
          >
            <div className="nutrition-navigator__metro-areas-body-wrap">
              <h2 className="nutrition-navigator__heading--h2">Search by:</h2>
              <ul className="nutrition-navigator__checkbox-items-wrap nutrition-navigator__metro-areas">
                {'success' === metroAreaStatus &&
                  metroAreas.map(({ id, name, slug }) => {
                    return (
                      <li
                        className="nutrition-navigator__checkbox-wrap"
                        key={id}
                      >
                        <LabelCheckBox
                          {...{
                            label: name,
                            name: 'metro-area[]',
                            value: slug,
                            onChange: onMetroAreaChange,
                            isChecked: filters['metro-areas'].includes(slug)
                          }}
                        />
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className="nutrition-navigator__program-types-body-wrap">
              <h2 className="nutrition-navigator__heading--h2">I want to...</h2>
              <ul className="nutrition-navigator__checkbox-items-wrap nutrition-navigator__program-types">
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
                              alt={`Icon for ${decode(name)}`}
                            />
                          ) : (
                            ''
                          )}
                          {decode(name)}
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
                More ways to search:
              </h2>
              <div className="nutrition-navigator__filters-grid">
                <div className="nutrition-navigator__filter-column">
                  <details className="nutrition-navigator__filter-details" open>
                    <summary>
                      <h5 className="nutrition-navigator__heading--h5">
                        By Language Offered
                      </h5>
                    </summary>
                    <ul className="nutrition-navigator__checkbox-items-wrap nutrition-navigator__checkbox-items-wrap--languages">
                      {languagesStatus === 'success' &&
                        languages.map((language) => {
                          return (
                            <li
                              className="nutrition-navigator__checkbox-wrap"
                              key={language.id}
                            >
                              <LabelCheckBox
                                {...{
                                  label: language.name,
                                  name: 'languages[]',
                                  value: language.slug,
                                  onChange: onLanguageChange,
                                  isChecked: filters.languages.includes(
                                    language.slug
                                  )
                                }}
                              />
                            </li>
                          );
                        })}
                    </ul>
                  </details>
                </div>
                <div className="nutrition-navigator__filter-column">
                  <details className="nutrition-navigator__filter-details" open>
                    <summary>
                      <h5 className="nutrition-navigator__heading--h5">
                        By Venue
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
                                  name: 'venue[]',
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
                </div>
                <div className="nutrition-navigator__filter-column">
                  <details className="nutrition-navigator__filter-details" open>
                    <summary>
                      <h5 className="nutrition-navigator__heading--h5">
                        By Audience
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
                                  isChecked: filters.audiences.includes(
                                    audience.slug
                                  )
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
                        id="organization-name"
                        name="organization-name"
                        className="nutrition-navigator__text-field"
                        value={filters['organization-name']}
                        onChange={onOrgNameChange}
                      />
                    </div>
                  </details>
                </div>
              </div>
            </div>
            <div className="nutrition-navigator__filters-footer">
              <button
                className="nutrition-navigator__button"
                onClick={onSearchButtonClick}
                type="button"
                disabled={programs.length === 0}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="nutrition-navigator__filters-reset-submit-button-group">
          <button
            className={`nutrition-navigator__button nutrition-navigator__button--outline ${
              isFiltersOpen ? 'nutrition-navigator__button--white' : ''
            }`}
            onClick={onResetButtonClick}
            type="button"
            disabled={programs.length === 0}
          >
            Reset
          </button>
          <button
            className={`nutrition-navigator__button ${
              isFiltersOpen ? 'nutrition-navigator__button--green' : ''
            }`}
            onClick={onSearchButtonClick}
            type="button"
            disabled={programs.length === 0}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapFilters;
