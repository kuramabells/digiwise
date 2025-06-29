/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Disable preflight to prevent conflicts with MUI
  corePlugins: {
    preflight: false,
  },
  // Safelist these selectors to prevent them from being purged
  safelist: [
    'html',
    'body'
    // Add any other selectors that should never be purged
  ]
};

export default config;