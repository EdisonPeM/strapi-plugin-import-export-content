"use strict";

/**
 * import-export-content.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const { getItemsFromContent } = require("./utils/contentParser");
const { analyze } = require("./analyzer");

const { mapFieldsToTargetFields } = require("./utils/fieldUtils");
const { importContent } = require("./importer");
const { PUBLISHED_AT_ATTRIBUTE } = require("../constants/contentTypes");

const { getContentFromItems } = require("./utils/contentParser");
const { getAll } = require("./exporter");

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
    const { attributes } = target;
    const mappedItems = await mapFieldsToTargetFields({
      items,
      fields,
      attributes,
      user,
    });
    return importContent(target, mappedItems, {
      [PUBLISHED_AT_ATTRIBUTE]: asDraft ? null : Date.now(),
    });
  },

  exportItems: async (ctx) => {
    const { target, type } = ctx.request.body;
    const exportItems = await getAll(target.uid, ctx);

    if (target.kind === "singleType") {
      return getContentFromItems({ items: exportItems, type });
    }

    return getContentFromItems({ items: exportItems, type });
  },
};
