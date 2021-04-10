"use strict";

/**
 * import-export-content.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const { getItemsFromData, parseItemsToModel } = require("./utils/parseData");
const { analyze } = require("./utils/analyzer");
const {
  importToCollectionType,
  importToSingleType,
} = require("./utils/importer");
const { getAll } = require("./utils/exporter");
const { getContentFromItems } = require("./utils/parseData");

module.exports = {
  preAnalyzeContent: (ctx) => {
    const { data, type } = ctx.request.body;
    const { sourceType, items } = getItemsFromData({ data, type });
    const itemCount = items.length;
    const fieldsInfo = analyze(items);
    return { itemCount, sourceType, fieldsInfo, parsedData: items };
  },

  importItems: async (ctx) => {
    const { target, fields, items } = ctx.request.body;
    const mappedItems = parseItemsToModel(items, fields);

    const { kind, uid } = target;
    if (kind === "collectionType") {
      return Promise.all(
        mappedItems.map((item) => importToCollectionType(target.uid, item))
      );
    } else if (kind === "singleType") {
      return importToSingleType(uid, mappedItems[0]);
    } else {
      throw new Error("Tipe is not supported");
    }
  },

  exportItems: async (ctx) => {
    const { target, type } = ctx.request.body;
    const exportItems = await getAll(target.uid);

    if (target.kind === "singleType") {
      return getContentFromItems(exportItems[0], type);
    }

    return getContentFromItems(exportItems, type);
  },
};
