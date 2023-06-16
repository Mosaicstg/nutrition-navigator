import { Config as LocalConfig } from './local.ts';
import { Config as ProdConfig } from './prod.ts';

const config =
  // Use local config when in development mode
  import.meta.env.DEV ? LocalConfig : ProdConfig;

export default config;
