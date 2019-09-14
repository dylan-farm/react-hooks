const context = require.context('./', false, /\.js$/);
const models = context
  .keys()
  .filter(item => item !== './index.js')
  .map(key => ({
    name: key.match(/\.\/(\S*)\.js/)[1],
    model: context(key).default,
  }));

export default models;
