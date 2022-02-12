const {
  stringIsEmail,
  stringIsDate,
  stringIsHour,
  stringIsUrl,
  urlIsMedia,
} = require("./formatsValidator");
const {
  getValidRelations,
  getValidMedia,
  getValidComponent,
  getValidDynamic,
} = require("./contentChecker");

const functions = () => ({
  getFormatFromField: (field) => {
    switch (typeof field) {
      case "number":
        return "number";
      case "boolean":
        return "boolean";
      case "object":
        if (Array.isArray(field)) return "array";
        return "object";
      case "string":
        if (stringIsEmail(field)) return "email";
        if (stringIsDate(field)) return "date";
        if (stringIsHour(field)) return "time";
        if (stringIsUrl(field)) {
          if (urlIsMedia(field)) return "media";
          return "url";
        }
        if (field.length > 255) return "text";
        return "string";
    }
  },

  getFieldsFromItems: (items) => {
    const fieldNames = new Set();
    items.forEach((item) => {
      try {
        Object.keys(item).forEach((fieldName) => fieldNames.add(fieldName));
      } catch (err) {
        console.error(err);
      }
    });

    return Array.from(fieldNames);
  },

  mapFieldsToTargetFields: ({ items, fields, attributes, user }) => {
    const fieldNames = getFieldsFromItems(items);
    return Promise.all(
      items.map(async (item) => {
        const mappedItem = {};

        for (const fieldname of fieldNames) {
          const { targetField } = fields[fieldname];
          if (targetField && targetField !== "none") {
            const attribute = attributes[targetField];
            let targetItem = item[fieldname];

            // Validate ids and import medias
            if (attribute.type === "relation") {
              targetItem = await getValidRelations(targetItem, attribute);
            } else if (attribute.type === "media") {
              targetItem = await getValidMedia(targetItem, attribute, user);
            } else if (attribute.type === "component") {
              targetItem = await getValidComponent(targetItem, attribute, user);
            } else if (attribute.type === "dynamiczone") {
              targetItem = await getValidDynamic(targetItem, attribute, user);
            }

            mappedItem[targetField] = targetItem;
          }
        }

        return mappedItem;
      })
    );
  }
});

module.exports = functions()