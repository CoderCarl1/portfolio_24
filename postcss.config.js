module.exports = {
  plugins: [
    require('autoprefixer'),
      require('cssnano')({
          preset: 'default',
      }),
  ],
  map: { inline: false }
};