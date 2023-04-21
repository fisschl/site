import type { Config } from "tailwindcss";

const config: Partial<Config> = {
  corePlugins: {
    preflight: false,
    container: false,
    visibility: false,
  },
};

export default config;
