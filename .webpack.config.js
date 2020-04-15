// define child rescript
module.exports = config => {
  // config.entry = ['@babel/polyfill', './src/index.js'];

  config.target = 'electron-renderer';

  // console.log(config.module.rules);

  config.module.rules[2].oneOf.splice(1, 1);
  config.module.rules[2].oneOf.unshift(
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      // exclude: /(node_modules)/,
      exclude: /node_modules\/(?!(@storycopter\/idoc|@storycopter\/ui)\/).*/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { modules: 'commonjs' }], '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties', 'babel-plugin-styled-components'],
          },
        },
      ],
    }
  );

  return config;
};