import config from '../config';

export const fetchApi = (route: string, options?: RequestInit) =>
  fetch(config.fetchBase + route, options);
