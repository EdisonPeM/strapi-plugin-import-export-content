const pluginPkg = require('../../package.json');
const pluginId = pluginPkg.name.replace(
  /^@strapi\//i,
  ''
);

module.exports = pluginId;
