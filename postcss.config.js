module.exports = {
  plugins: [
    'tailwindcss',
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          'custom-properties': false,
        },
      },
    ],
    ...(process.env.NODE_ENV === 'production'
      ? [
          [
            '@fullhuman/postcss-purgecss',
            {
              content: ['./src/**/*.{js,jsx,ts,tsx}'],
              defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
            },
          ],
        ]
      : []),
    [
      'cssnano',
      {
        preset: 'default',
      },
    ],
  ],
};
