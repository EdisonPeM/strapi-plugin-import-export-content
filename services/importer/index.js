const { getImporter } = require("./importUtils");

function mapAndImport({
  user,
  target,
  items,
  fieldsMapping,
  otherFields = {},
}) {
  const { uid, kind, attributes } = target;
  const importItem = getImporter(kind);

  return Promise.all(
    items.map(async (item) => {
      const mappedItem = { ...otherFields };
      Object.entries(item).forEach(([key, value]) => {
        const { targetField } = fieldsMapping[key];
        if (targetField === "none") return;

        const attribute = attributes[targetField];
        const mappedValue = value;

        console.log(`Map ${targetField}, from: ${value} to`, attribute);

        mappedItem[targetField] = mappedValue;
      });

      return importItem(uid, mappedItem);
    })
  );
}

module.exports = { mapAndImport };
