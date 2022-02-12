const PERMISSIONS = require("../../constants/permissions");
const { cleanFields } = require("./exportUtils");

module.exports = (
  {
    strapi
  }
) => {
  async function getData(target, options, userAbility) {
    const { uid, attributes } = target;
    const permissionsManager =
      strapi.admin.services.permission.createPermissionsManager({
        ability: userAbility,
        model: uid,
      });

    // Filter content by permissions
    const query = permissionsManager.queryFrom({ _limit: -1 }, PERMISSIONS.read);

    const items = await strapi.entityService.find(
      { params: query },
      { model: uid }
    );

    return Array.isArray(items)
      ? items.map((item) => cleanFields(item, options, attributes))
      : [cleanFields(items, options, attributes)];
  }

  return {
    getData
  };
};
