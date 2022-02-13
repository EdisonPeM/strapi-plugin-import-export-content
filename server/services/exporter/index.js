'use strict';
const PERMISSIONS = require("../../constants/permissions");
const { cleanFields } = require("./exportUtils");
const functions = () => ({
  getData: async (target, options, userAbility) => {
    const { uid, attributes } = target;
    const permissionsManager =
      strapi.admin.services.permission.createPermissionsManager({
        ability: userAbility,
        model: uid,
      });

    // Filter content by permissions
    const query = permissionsManager.getQuery({ _limit: -1 }, PERMISSIONS.read);
    const items = await strapi.entityService.findMany(uid, { populate: '*' });
    console.log(items)

    return Array.isArray(items)
      ? items.map((item) => cleanFields(item, options, attributes))
      : [cleanFields(items, options, attributes)];
  }
});

module.exports= functions()