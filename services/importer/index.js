const RELATIONS = require("../../constants/relations");
const contentFieldsTypes = require("../../constants/contentFieldsTypes");
const { cast, types } = require("../dataParser");

const {
  validateRelations,
  validateMedias,
  validateComponent,
  ValidateDynamicZone,
} = require("./validators");
const { importItem } = require("./importTypes");

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

          switch (type) {
            case "relation": {
              const { targetModel, relationType } = attribute;
              const isMultiple = RELATIONS.MANY.includes(relationType);
              mappedItem[targetField] = await validateRelations(
                value,
                targetModel,
                isMultiple
              );
              break;
            }

            case "media": {
              const { multiple } = attribute;
              mappedItem[targetField] = await validateMedias(value, multiple);
              break;
            }

            case "component": {
              const { component, repeatable } = attribute;
              mappedItem[targetField] = await validateComponent(
                value,
                component,
                repeatable
              );
              break;
            }

            case "dynamiczone": {
              const { components } = attribute;
              mappedItem[targetField] = await ValidateDynamicZone(
                value,
                components
              );
              break;
            }

            default: {
              const format = contentFieldsTypes[type];
              mappedItem[targetField] = cast(value, format);
            }
          }
        })
      );

      return importItem(kind, uid, mappedItem);
    })
  );
}

module.exports = { mapAndImport };
