import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        positive: `#15DC5E`,
        negative: `#FF3F3F`,
        Gray90: '#E6E6E6',
      },
    },
  },
  plugins: [],
};

export default config;
