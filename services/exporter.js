const PERMISSIONS = require("../constants/permissions");
const ignoreFields = [
  "id",
  "created_at",
  "created_by",
  "updated_at",
  "updated_by",
  "published_at",
];

function cleanFields(item) {
  if (item === null || item === undefined) return;
  Object.keys(item).forEach((itemKey) => {
    if (ignoreFields.includes(itemKey)) return delete item[itemKey];
    if (typeof item[itemKey] === "object") return cleanFields(item[itemKey]);
  });

  return item;
}

async function getAll(uid, ctx) {
  const { userAbility } = ctx.state;
  const permissionsManager = strapi.admin.services.permission.createPermissionsManager(
    { ability: userAbility, model: uid }
  );

  // Filter content by permissions
  const query = permissionsManager.queryFrom({}, PERMISSIONS.read);
  const items = await strapi.entityService.find(
    { params: query },
    { model: uid }
  );

  return Array.isArray(items) ? items.map(cleanFields) : cleanFields(items);
}

module.exports = {
  getAll,
};
