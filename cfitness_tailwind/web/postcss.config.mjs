// Tailwind v4 runs as a PostCSS plugin. There is no tailwind.config.js: the theme lives in app/globals.css.
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
