const { environment } = require('@rails/webpacker');

// make Webpack “understand” .gql
environment.loaders.append('graphql', {
  test: /\.()$/,
  exclude: /node_modules/,
  loader: 'graphql-tag/loader',
});

module.exports = environment;
