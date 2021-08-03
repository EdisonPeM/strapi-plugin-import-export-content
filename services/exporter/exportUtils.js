const ignoreFields = {
  ids: ["id"],
  timestamp: ["created_at", "updated_at", "published_at"],
  user: ["created_by", "updated_by"],
};

function cleanFields(item, options) {
  if (item === null || item === undefined) return;

  const mappedItem = { ...item };
  if (options.ids) {
    ignoreFields.ids.forEach((key) => {
      delete mappedItem[key];
    });
  }

  if (options.timestamp) {
    ignoreFields.timestamp.forEach((key) => {
      delete mappedItem[key];
    });
  }

  // Always true
  ignoreFields.user.forEach((key) => {
    delete mappedItem[key];
  });

  return mappedItem;
}

module.exports = { cleanFields };
