import React from 'react';
import { flushSync } from 'react-dom';
import { decode } from 'html-entities';
import { Form, useLocation, useSubmit } from 'react-router';

// Hooks
import { useProgramTypes } from '~/hooks/useProgramTypes/useProgramTypes.tsx';
import { useVenues } from '~/hooks/useVenues/useVenues.tsx';
import { useAudiences } from '~/hooks/useAudiences/useAudiences.tsx';
import { useRegions } from '~/hooks/useRegions/useRegions.tsx';
import { useLanguages } from '~/hooks/useLanguages/useLanguages.tsx';

// Components
import LabelCheckBox from './LabelCheckBox.tsx';
import type { Program } from '~/routes/schema.ts';

type MapFiltersProps = {
  address: string;
  regions: Array<string>;
  programTypes: Array<string>;
  languages: Array<string>;
  venues: Array<string>;
  audiences: Array<string>;
  organizationName: string;
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  programs?: Array<Program>;
  desktopFiltersToggleButtonRef?: React.RefObject<HTMLButtonElement | null>;
  filtersFormToggleButtonRef?: React.RefObject<HTMLButtonElement | null>;
};

export const MapFilters = ({
  address: defaultAddress,
  regions: defaultRegions,
  programTypes: defaultProgramTypes,
  languages: defaultLanguages,
  venues: defaultVenues,
  audiences: defaultAudiences,
  organizationName: defaultOrganizationName,
  showFilters,
  setShowFilters,
  programs,
  desktopFiltersToggleButtonRef,
  filtersFormToggleButtonRef
}: MapFiltersProps) => {
  const location = useLocation();
  const submit = useSubmit();

  const { data: programTypes, status: programsTypesStatus } = useProgramTypes();
  const { data: languages, status: languagesStatus } = useLanguages();
  const { data: venues, status: venuesStatus } = useVenues();
  const { data: audiences, status: audiencesStatus } = useAudiences();
  const { data: regions, status: regionsStatus } = useRegions();

  const isFiltersOpen = showFilters;

  function handleFiltersToggleButtonClick() {
    const nextValue = !showFilters;

    flushSync(() => {
      setShowFilters(() => {
        return nextValue;
      });
    });

    if (!nextValue && window.innerWidth > 768) {
      desktopFiltersToggleButtonRef?.current?.focus();
    }
  }

  const onSearchButtonClick = () => {
    // Close Filters window
    flushSync(() => {
      setShowFilters(false);
    });

    desktopFiltersToggleButtonRef?.current?.focus();
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
      inert={!isFiltersOpen && window.innerWidth > 768}
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
                showFilters
                  ? 'nutrition-navigator__text-field--filters-open'
                  : ''
              }`}
              defaultValue={defaultAddress}
              autoComplete="true"
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
              ref={filtersFormToggleButtonRef}
              className="nutrition-navigator__button nutrition-navigator__filters-toggle-button"
              onClick={handleFiltersToggleButtonClick}
              type="button"
              aria-label="Toggle Filters Window Open and Closed"
              aria-expanded={showFilters}
              aria-controls="nutrition-navigator-filters"
              id="toggle-filters"
            >
              Filters
            </button>
          </div>
        </div>
        <div
          id="nutrition-navigator-filters"
          className="nutrition-navigator__filters-body-wrap"
          aria-labelledby="toggle-filters"
          inert={!isFiltersOpen}
        >
          <div className="nutrition-navigator__regions-body-wrap">
            <h2 className="nutrition-navigator__heading--h2">
              Search by region:
            </h2>
            <ul className="nutrition-navigator__checkbox-items-wrap nutrition-navigator__regions">
              {'success' === regionsStatus &&
                regions.map(({ id, name, slug }) => {
                  return (
                    <li className="nutrition-navigator__checkbox-wrap" key={id}>
                      <LabelCheckBox
                        {...{
                          label: name,
                          name: 'regions[]',
                          value: slug,
                          id: slug,
                          defaultChecked: defaultRegions.includes(slug)
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
                            aria-hidden="true"
                          />
                        ) : (
                          ''
                        )}
                        {decode(name)}
                      </label>
                      <input
                        type="checkbox"
                        name="program-types[]"
                        value={slug}
                        id={slug}
                        className="nutrition-navigator__checkbox"
                        defaultChecked={defaultProgramTypes.includes(slug)}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="nutrition-navigator__sub-filters">
            <div className="nutrition-navigator__filters-grid">
              <div className="nutrition-navigator__filter-column">
                <details className="nutrition-navigator__filter-details">
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
                <details className="nutrition-navigator__filter-details">
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
                                name: 'venues[]',
                                value: venue.slug,
                                id: venue.slug,
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
                <details className="nutrition-navigator__filter-details">
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
                                name: 'audiences[]',
                                value: audience.slug,
                                id: audience.slug,
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
                <details className="nutrition-navigator__filter-details nutrition-navigator__filter-details--org-name">
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
                      defaultValue={defaultOrganizationName}
                    />
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
        <div className="nutrition-navigator__filters-reset-submit-button-group">
          {programs?.length === 0 ? (
            <div className="nutrition-navigator__no-results">
              <span>No results found.</span>{' '}
              <em>
                Please adjust your filter parameters to broaden the search
                criteria
              </em>
              .
            </div>
          ) : null}
          <button
            className={`nutrition-navigator__button nutrition-navigator__button--outline ${
              isFiltersOpen ? 'nutrition-navigator__button--white' : ''
            }`}
            onClick={onFormReset}
            type="reset"
          >
            Reset
          </button>
          <button
            className={`nutrition-navigator__button ${
              isFiltersOpen ? 'nutrition-navigator__button--green' : ''
            }`}
            onClick={onSearchButtonClick}
            type="submit"
          >
            Search
          </button>
        </div>
      </div>
    </Form>
  );
};
