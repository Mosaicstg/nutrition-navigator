import { Config as LocalConfig } from '../config/local.ts';
import { Config } from '../config/prod.ts';

export const fetchApi = (route: string, options?: RequestInit) =>
  fetch(
    // Only use local config when in dev mode
    (LocalConfig?.fetchBase && import.meta.env.DEV
      ? LocalConfig.fetchBase
      : Config?.fetchBase) + route,
    options
  );
