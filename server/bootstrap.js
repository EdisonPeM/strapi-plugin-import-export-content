'use strict';

module.exports = async ({ strapi }) => {
  const actions = [
    {
      section: 'plugins',
      displayName: 'Access to export content',
      uid: 'export',
      pluginName: 'import-export-content',
    },
    {
      section: 'plugins',
      displayName: 'Access to import content',
      uid: 'import',
      pluginName: 'import-export-content',
    },
  ];
  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};
