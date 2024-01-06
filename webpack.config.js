const path = require('path');

module.exports = {
  // Set mode to production to see the "tree-shaken" size
  mode: "development",
  entry: './src/signIn.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'eval-cheap-source-map',
  watch: true,

};