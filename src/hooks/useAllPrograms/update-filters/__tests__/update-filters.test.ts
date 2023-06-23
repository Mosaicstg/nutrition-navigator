import { describe, it, expect } from 'vitest';
import { updateFilters } from '../update-filters.ts';
import { AllProgramsState, Filters } from '../../types.ts';

describe('AllProgramsState updateFilters function', () => {
  it('returns state with updated filters', () => {
    const testState: AllProgramsState = {
      programs: [],
      filteredPrograms: [],
      filters: {
        'program-types': [],
        venues: [],
        audiences: [],
        'organization-name': '',
        address: ''
      }
    };

    const filters: Filters = {
      'program-types': [],
      venues: [],
      audiences: [],
      'organization-name': '',
      address: ''
    };

    filters['program-types'].push('hello-world');

    const state = updateFilters([
      testState,
      { type: 'UPDATE_FILTERS', data: filters }
    ]);

    expect(state).not.toStrictEqual(testState);
    expect(state.filters['program-types']).toContain('hello-world');
  });

  it('should throw an error', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => updateFilters()).toThrowError();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => updateFilters({}, {})).toThrowError();
  });
});
