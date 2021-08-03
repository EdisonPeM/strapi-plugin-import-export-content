const PERMISSIONS = require("../../constants/permissions");
const { cleanFields } = require("./exportUtils");

async function getData(target, options, userAbility) {
  const { uid } = target;
  const permissionsManager =
    strapi.admin.services.permission.createPermissionsManager({
      ability: userAbility,
      model: uid,
    });

  // Filter content by permissions
  const query = permissionsManager.queryFrom({}, PERMISSIONS.read);

  const items = await strapi.entityService.find(
    { params: query },
    { model: uid }
  );

  return Array.isArray(items)
    ? items.map((item) => cleanFields(item, options))
    : [cleanFields(items, options)];
}

module.exports = {
  getData,
};
