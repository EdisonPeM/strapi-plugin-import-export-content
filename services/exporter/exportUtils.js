const ignoreFields = {
  ids: ["id"],
  timestamp: ["created_at", "updated_at", "published_at"],
  user: ["created_by", "updated_by"],
};

function cleanFields(item, options) {
  if (item === null || item === undefined) return;

  const mappedItem = { ...item };
  Object.keys(mappedItem).forEach((itemKey) => {
    if (ignoreFields.ids.includes(itemKey) && options.ids) {
      return delete mappedItem[itemKey];
    }

    if (ignoreFields.timestamp.includes(itemKey) && options.timestamp) {
      return delete mappedItem[itemKey];
    }

    if (ignoreFields.user.includes(itemKey) && options.user) {
      return delete mappedItem[itemKey];
    }

    if (typeof mappedItem[itemKey] == "object") {
      mappedItem[itemKey] = cleanFields(mappedItem[itemKey], options);
    }
  });

  return mappedItem;
}

module.exports = { cleanFields };
