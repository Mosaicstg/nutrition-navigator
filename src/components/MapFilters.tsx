import React from 'react';
import { decode } from 'html-entities';
import {
  Form,
  LoaderFunction,
  // useLoaderData,
  useLocation,
  // useSearchParams,
  useSubmit
} from 'react-router';

// Hooks
import useProgramTypes from '../hooks/useProgramTypes/useProgramTypes.tsx';
import useVenues from '../hooks/useVenues/useVenues.tsx';
import useAudiences from '../hooks/useAudiences/useAudiences.tsx';
import useRegions from '../hooks/useRegions/useRegions.tsx';
// import {
//   defaultFilters,
//   Filters,
//   useMapFilters
// } from '../hooks/useMapFilters/useMapFilters.tsx';

// Components
import LabelCheckBox from './LabelCheckBox.tsx';

// Types
// import {
//   AllProgramsDispatch,
//   AllProgramsState,
//   Program
// } from '~/hooks/useAllPrograms/types.ts';
import { useLanguages } from '../hooks/useLanguages/useLanguages.tsx';
// import { loader } from '~/routes/root.tsx';

export type LoaderData<TLoaderFn extends LoaderFunction> =
  Awaited<ReturnType<TLoaderFn>> extends Response | infer D ? D : never;

// type MapFiltersProps = {
//   state: AllProgramsState;
//   dispatch: AllProgramsDispatch;
//   programs: Array<Program>;
// };
type MapFiltersProps = {
  address: string;
  regions: Array<string>;
  programTypes: Array<string>;
  languages: Array<string>;
  venues: Array<string>;
  audiences: Array<string>;
  organizationName: string;
};

const MapFilters = (props: MapFiltersProps) => {
  const {
    address: defaultAddress,
    regions: defaultRegions,
    programTypes: defaultProgramTypes,
    languages: defaultLanguages,
    venues: defaultVenues,
    audiences: defaultAudiences,
    organizationName: defaultOrganizationName
  } = props;
  // const { programs } = props;
  const location = useLocation();
  const submit = useSubmit();

  // const [filters, setLocalFilters] = useMapFilters();
  const { data: programTypes, status: programsTypesStatus } = useProgramTypes();
  const { data: languages, status: languagesStatus } = useLanguages();
  const { data: venues, status: venuesStatus } = useVenues();
  const { data: audiences, status: audiencesStatus } = useAudiences();
  const { data: regions, status: regionsStatus } = useRegions();

  const [isFiltersOpen, setIsFiltersIsFiltersOpen] = React.useState(false);
  // const { programs } = state;

  // const onAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const prevFilters = filters;
  //   const zipCode = event.target.value;

  //   const newFilters: Filters = {
  //     ...prevFilters,
  //     address: zipCode
  //   };

  //   setLocalFilters(() => newFilters);
  // };

  // const onRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const prevFilters = filters;
  //   const { regions } = prevFilters;

  //   const newFilters = {
  //     ...prevFilters,
  //     regions: regions.includes(event.target.value)
  //       ? regions.filter((region) => event.target.value !== region)
  //       : [...regions, event.target.value]
  //   };

  //   setLocalFilters(() => newFilters);
  // };

  // const onLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const prevFilters = filters;
  //   const { languages } = prevFilters;

  //   const newFilters = {
  //     ...prevFilters,
  //     languages: languages.includes(event.target.value)
  //       ? languages.filter((language) => event.target.value !== language)
  //       : [...languages, event.target.value]
  //   };

  //   setLocalFilters(() => newFilters);
  // };

  // const onVenueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const prevFilters = filters;
  //   const { venues } = prevFilters;

  //   const newFilters = {
  //     ...prevFilters,
  //     venues: venues.includes(event.target.value)
  //       ? venues.filter((venue) => event.target.value !== venue)
  //       : [...venues, event.target.value]
  //   };

  //   setLocalFilters(() => newFilters);
  // };

  // const onAudienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const prevFilters = filters;
  //   const { audiences } = prevFilters;

  //   const newFilters = {
  //     ...prevFilters,
  //     audiences: audiences.includes(event.target.value)
  //       ? audiences.filter((audience) => event.target.value !== audience)
  //       : [...audiences, event.target.value]
  //   };

  //   setLocalFilters(() => newFilters);
  // };

  // const onOrgNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const prevFilters = filters;

  //   const newFilters: Filters = {
  //     ...prevFilters,
  //     'organization-name': event.target.value
  //   };

  //   setLocalFilters(() => newFilters);
  // };

  const onSearchButtonClick = () => {
    // dispatch({ type: 'UPDATE_PROGRAMS', filters });

    // Close Filters window
    setIsFiltersIsFiltersOpen(false);
  };

  const onResetButtonClick = () => {
    // setLocalFilters(() => defaultFilters);
    // dispatch({ type: 'RESET' });
  };

  function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const address = formData.get('address');
    const organizationName = formData.get('organization-name');

    if (!address) {
      formData.delete('address');
    }

    if (!organizationName) {
      formData.delete('organization-name');
    }

    onSearchButtonClick();
    submit(formData, {
      action: location.pathname,
      method: 'get',
      preventScrollReset: true
    });
  }

  function onFormReset(event: React.MouseEvent<HTMLButtonElement>) {
    const resetButton = event.currentTarget;
    const form = resetButton.form;

    if (!form) {
      return;
    }

    onResetButtonClick();
    submit(null, {
      action: location.pathname,
      method: 'get',
      preventScrollReset: true
    });
  }

  return (
    <Form
      method="get"
      action={location.pathname}
      className={`nutrition-navigator__filters-wrap ${
        isFiltersOpen ? 'nutrition-navigator__filters-wrap--open' : ''
      }`}
      onSubmit={onFormSubmit}
    >
      <div className="nutrition-navigator__filters-header-wrap">
        <div className="nutrition-navigator__filter-header-address-filters-wrap">
          <div className="nutrition-navigator__address-input-wrap">
            <label
              htmlFor="address"
              className="nutrition-navigator__helper-text"
            >
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
              // value={filters.address}
              defaultValue={defaultAddress}
              // onChange={onAddressChange}
              autoComplete="true"
              // readOnly={programs.length === 0}
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
              <div className="nutrition-navigator__regions-body-wrap">
                <h2 className="nutrition-navigator__heading--h2">
                  Search by region:
                </h2>
                <ul className="nutrition-navigator__checkbox-items-wrap nutrition-navigator__regions">
                  {'success' === regionsStatus &&
                    regions.map(({ id, name, slug }) => {
                      return (
                        <li
                          className="nutrition-navigator__checkbox-wrap"
                          key={id}
                        >
                          <LabelCheckBox
                            {...{
                              label: name,
                              name: 'region[]',
                              value: slug,
                              id: slug,
                              // onChange: onRegionChange,
                              // isChecked: filters['regions'].includes(slug),
                              defaultChecked: defaultRegions.includes(slug)
                            }}
                          />
                        </li>
                      );
                    })}
                </ul>
              </div>
              <div className="nutrition-navigator__program-types-body-wrap">
                <h2 className="nutrition-navigator__heading--h2">
                  I want to...
                </h2>
                <ul className="nutrition-navigator__checkbox-items-wrap nutrition-navigator__program-types">
                  {programsTypesStatus === 'success' &&
                    programTypes.map(
                      ({ name, slug, meta: { icon } }, index) => {
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
                              // onChange={onProgramTypeChange}
                              defaultChecked={defaultProgramTypes.includes(
                                slug
                              )}
                            />
                          </li>
                        );
                      }
                    )}
                </ul>
              </div>
              <div className="nutrition-navigator__sub-filters">
                <h2 className="nutrition-navigator__heading--h3">
                  More ways to search:
                </h2>
                <div className="nutrition-navigator__filters-grid">
                  <div className="nutrition-navigator__filter-column">
                    <details
                      className="nutrition-navigator__filter-details"
                      open
                    >
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
                                    id: language.slug,
                                    // onChange: onLanguageChange,
                                    // isChecked: filters.languages.includes(
                                    // language.slug
                                    // ),
                                    defaultChecked: defaultLanguages.includes(
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
                    <details
                      className="nutrition-navigator__filter-details"
                      open
                    >
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
                                    id: venue.slug,
                                    // onChange: onVenueChange,
                                    // isChecked: filters.venues.includes(
                                    //   venue.slug
                                    // )
                                    defaultChecked: defaultVenues.includes(
                                      venue.slug
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
                    <details
                      className="nutrition-navigator__filter-details"
                      open
                    >
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
                                    id: audience.slug,
                                    // onChange: onAudienceChange,
                                    // isChecked: filters.audiences.includes(
                                    //   audience.slug
                                    // )
                                    defaultChecked: defaultAudiences.includes(
                                      audience.slug
                                    )
                                  }}
                                />
                              </li>
                            );
                          })}
                      </ul>
                    </details>
                    <details
                      className="nutrition-navigator__filter-details nutrition-navigator__filter-details--org-name"
                      open
                    >
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
                          // value={filters['organization-name']}
                          defaultValue={defaultOrganizationName}
                          // onChange={onOrgNameChange}
                        />
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="nutrition-navigator__filters-reset-submit-button-group">
          <button
            className={`nutrition-navigator__button nutrition-navigator__button--outline ${
              isFiltersOpen ? 'nutrition-navigator__button--white' : ''
            }`}
            onClick={onFormReset}
            type="reset"
            // disabled={programs.length === 0}
          >
            Reset
          </button>
          <button
            className={`nutrition-navigator__button ${
              isFiltersOpen ? 'nutrition-navigator__button--green' : ''
            }`}
            onClick={onSearchButtonClick}
            type="submit"
            // disabled={programs.length === 0}
          >
            Search
          </button>
        </div>
      </div>
    </Form>
  );
};

export default MapFilters;
