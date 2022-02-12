'use strict';
const ignoreFields = {
  ids: ["id"],
  timestamp: ["created_at", "updated_at", "published_at"],
  user: ["created_by", "updated_by"],
};

const functions = () => {
  return {
    mapMedias: (media, options) => {
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
    },
  
    mapRelations: (relation, options, attributes) => {
      if (options.relations == "ids") {
        if (Array.isArray(relation)) {
          return relation.map(({ id }) => id);
        } else {
          return relation.id;
        }
      }
  
      // options.relations == "full"
      if (Array.isArray(relation)) {
        return relation.map((rel) => cleanFields(rel, options, attributes));
      } else {
        return cleanFields(relation, options, attributes);
      }
    },
  
    cleanFields: (item, options, attributes) => {
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
          const { type, model, collection } = attributes[itemKey];
          if (type === "media" || model == "file" || collection == "file") {
            if (options.medias == "none") {
              return delete mappedItem[itemKey];
            } else {
              mappedItem[itemKey] = mapMedias(mappedItem[itemKey], options);
            }
          }
  
          if (type === "relation") {
            const { attributes } = model
              ? strapi.models[model]
              : strapi.models[collection];
  
            if (options.relations == "none") {
              return delete mappedItem[itemKey];
            } else {
              mappedItem[itemKey] = mapRelations(
                mappedItem[itemKey],
                options,
                attributes
              );
            }
          }
  
          if (type == "component") {
            const { repeatable, component } = attributes[itemKey];
            const { attributes: componentAttributes } =
              strapi.components[component];
  
            if (repeatable) {
              mappedItem[itemKey] = mappedItem[itemKey].map((componentItem) =>
                cleanFields(componentItem, options, componentAttributes)
              );
            } else {
              mappedItem[itemKey] = cleanFields(
                mappedItem[itemKey],
                options,
                componentAttributes
              );
            }
          }
  
          if (type == "dynamiczone") {
            mappedItem[itemKey] = mappedItem[itemKey].map((dynamicItem) => {
              const { attributes: componentAttributes } =
                strapi.components[dynamicItem["__component"]];
              return cleanFields(dynamicItem, options, componentAttributes);
            });
          }
        }
      });
      // -----------------------------
  
      return mappedItem;
    }
  }
}

console.log("SDFSDF", functions())

module.exports = functions()
