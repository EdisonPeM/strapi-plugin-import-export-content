const ignoreFields = {
  ids: ["id"],
  timestamp: ["created_at", "updated_at", "published_at"],
  user: ["created_by", "updated_by"],
};

function mapMedias(media, options) {
  if (options.medias == "ids") {
    if (Array.isArray(media)) {
      return media.map(({ id }) => id);
    } else {
      return media.id;
    }
  }

  if (options.medias == "url") {
    if (Array.isArray(media)) {
      return media.map(({ url }) => url);
    } else {
      return media.url;
    }
  }

  if (options.medias == "without-formats") {
    if (Array.isArray(media)) {
      media.forEach((med) => delete med.formats);
    } else {
      delete media.formats;
    }
  }

  // options.medias == "full"
  if (Array.isArray(media)) {
    return media.map((med) => cleanFields(med, options, {}));
  } else {
    return cleanFields(media, options, {});
  }
}

function cleanFields(item, options, attributes) {
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

  // -----------------------------
  Object.keys(attributes).forEach((itemKey) => {
    if (mappedItem[itemKey]) {
      const attribute = attributes[itemKey];
      if (attribute.type === "media") {
        if (options.medias == "none") {
          return delete mappedItem[itemKey];
        } else {
          mappedItem[itemKey] = mapMedias(mappedItem[itemKey], options);
        }
      }
    }
  });
  // -----------------------------

  return mappedItem;
}

module.exports = { cleanFields };
