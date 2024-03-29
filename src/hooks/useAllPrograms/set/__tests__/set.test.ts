import {
  describe,
  it,
  afterEach,
  expect,
  vi,
  beforeEach,
  SpyInstance
} from 'vitest';
import { set } from '../set.ts';
import { defaultState } from '../../reducer.ts';
import { createFakeProgram } from '../../../../mocks/program.ts';
import { ProgramSchema } from '../../schema.ts';

let consoleSpy: SpyInstance;

describe('Set function for AllPrograms State', () => {
  beforeEach(() => {
    // Hide console error logs for test
    vi.spyOn(console, 'error').mockImplementation(() => {
      return undefined;
    });

    // SpyOn `console.error`
    consoleSpy = vi.spyOn(console, 'error');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw an error', () => {
    // Should throw an error when data is missing

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => set([])).toThrowError();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => set([{}, {}])).toThrowError();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => set([{}, { type: 'SET' }])).toThrowError();
  });

  it('returns a state with empty programs with incorrect Programs data passed in', () => {
    const programSafeParseSpy = vi.spyOn(ProgramSchema, 'safeParse');

    const programs = ['hello world', 'hello world'];
    const testState = {
      programs: programs,
      filteredPrograms: []
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const setState = set([testState, { type: 'SET', data: programs }]);

    // With reset length of programs should be 0
    expect(setState.programs).toHaveLength(0);

    // Ensure zod safeParse was called on every Program
    expect(programSafeParseSpy).toHaveBeenCalledTimes(programs.length);

    // Since data isn't of type Programs
    expect(consoleSpy).toHaveBeenCalledTimes(programs.length);
  });

  it('returns with state that has some programs from data passed in', () => {
    const programSafeParseSpy = vi.spyOn(ProgramSchema, 'safeParse');
    const testProgramObject = createFakeProgram();

    const programs = [testProgramObject, {}, testProgramObject];

    const testState = { ...defaultState, programs };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const setState = set([testState, { type: 'SET', data: programs }]);

    // Ensure zod safeParse was called on every Program
    expect(programSafeParseSpy).toHaveBeenCalledTimes(programs.length);

    // Ensure both programs and filteredPrograms are equal
    expect(setState.filteredPrograms).toStrictEqual(setState.programs);

    // Ensure empty object was removed
    expect(setState.filteredPrograms).toHaveLength(programs.length - 1);
  });
});
