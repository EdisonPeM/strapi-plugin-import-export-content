"use strict";

/**
 * import-export-content.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const {
  getItemsFromContent,
  getContentFromItems,
  mapItemToModel,
} = require("./utils/dataParser");
const { analyze } = require("./utils/analyzer");
const {
  importToCollectionType,
  importToSingleType,
} = require("./utils/importer");
const { getAll } = require("./utils/exporter");

module.exports = {
  preAnalyzeContent: (ctx) => {
    const { data, type } = ctx.request.body;
    const items = getItemsFromContent({ data, type });
    const fieldsInfo = analyze(items);
    return { fieldsInfo, parsedData: items };
  },

  importItems: async (ctx) => {
    const { user } = ctx.state;
    const { target, fields, items, asDraft } = ctx.request.body;
    const { uid, kind } = target;

    const mappedItems = items.map((item) => mapItemToModel(item, fields));

    if (kind === "collectionType") {
      return Promise.all(
        mappedItems.map((item) =>
          importToCollectionType(target.uid, {
            ...item,
            created_by: user.id,
            updated_by: user.id,
            published_at: asDraft ? null : Date.now(),
          })
        )
      );
    } else if (kind === "singleType") {
      return importToSingleType(uid, {
        ...mappedItems[0],
        created_by: user.id,
        updated_by: user.id,
        published_at: asDraft ? null : Date.now(),
      });
    } else {
      throw new Error("Tipe is not supported");
    }
  },

  exportItems: async (ctx) => {
    const { target, type } = ctx.request.body;
    const exportItems = await getAll(target.uid, ctx);

    if (target.kind === "singleType") {
      return getContentFromItems(exportItems[0], type);
    }

    return getContentFromItems(exportItems, type);
  },
};
