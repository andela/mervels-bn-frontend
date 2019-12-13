// const path = require('path');
// // your app's webpack.config.js
// const custom = require('../config/webpack.config.js');

// module.exports = async ({ config, mode }) => {
//   return { ...config, module: { ...config.module, rules: custom.module.rules } };
// };

const path = require('path');

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });
  return config;
};