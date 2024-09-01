import type { Config } from 'tailwindcss';
import { appConfig } from './src/config/app';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  theme: {
    extend: {
      colors: appConfig.colors,
    },
  },
  plugins: [],
};

export default config;
