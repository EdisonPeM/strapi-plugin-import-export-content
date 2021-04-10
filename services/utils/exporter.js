const ignoreFields = [
  "id",
  "created_at",
  "created_by",
  "updated_at",
  "updated_by",
  "published_at",
];

async function getAll(uid) {
  const items = await strapi.query(uid).find({});
  return items.map((item) => {
    ignoreFields.forEach((field) => {
      delete item[field];
    });
    return item;
  });
}

module.exports = {
  getAll,
};
