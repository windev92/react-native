/*module.exports = ({ platform }) => ({
  entry: `./index.ios.js`,
});*/

/*
module.exports = ({ platform }, { module, resolve }) => ({
  entry: `./index.${platform}.js`,
  module: {
    ...module,
    rules: [
      {
        test: /\.(c|d|t)sv$/, // load all .csv, .dsv, .tsv files with dsv-loader
        loader: 'dsv-loader'
      },
      ...module.rules
    ]
  },
  resolve: {
    ...resolve,
    extensions: [
      '.csv',
      '.dsv',
      '.tsv',
      ...resolve.extensions
    ]
  }
});*/

const AssetResolver = require('haul/src/resolvers/AssetResolver');

module.exports = ({ platform }, defaults) => ({
  entry: `./index.js`,
  module: {
    ...defaults.module,
    rules: [
      ...defaults.module.rules,
      {
        test: /\.px$/,
        use: require.resolve('haul/src/loaders/assetLoader'),
      }
    ],
  },
  resolve: {
    ...defaults.resolve,
    plugins: [...defaults.resolve.plugins, new AssetResolver({ platform, test: /\.px$/ })],
  },
});
