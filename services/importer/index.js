const { importItem } = require("./importTypes");
const { cast } = require("../dataParser");

const contentFieldsTypes = require("../../constants/contentFieldsTypes");

function mapAndImport({ user, target, items, fieldsMapping, otherFields }) {
  const { uid, kind, attributes } = target;

  return Promise.all(
    items.map(async (item) => {
      const mappedItem = { ...otherFields };
      const itemEntries = Object.entries(item);

      await Promise.all(
        itemEntries.map(async ([key, value]) => {
          const { targetField } = fieldsMapping[key];
          if (targetField === "none") return;

          const attribute = attributes[targetField];
          const { type } = attribute;

          const format = contentFieldsTypes[type];
          mappedItem[targetField] = cast(value, format);
        })
      );

      return importItem(kind, uid, mappedItem);
    })
  );
}

module.exports = { mapAndImport };
