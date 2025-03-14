import { Config as LocalConfig } from './local.ts';
import { Config as ProdConfig } from './prod.ts';

let config =
  // Use local config when in development mode
  import.meta.env.MODE === 'development' ? LocalConfig : ProdConfig;

if (import.meta.env.MODE === 'test') {
  config = ProdConfig;
  config.fetchBase = 'https://map.thefoodtrust.org';
}

export default config;
