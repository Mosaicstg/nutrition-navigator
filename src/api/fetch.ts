import config from '../config/index.ts';

export const fetchApi = (route: string, options?: RequestInit) =>
  fetch(config.fetchBase + route, options);
