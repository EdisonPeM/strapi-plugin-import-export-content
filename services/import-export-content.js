"use strict";

/**
 * import-export-content.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const { getItemsFromContent, getContentFromItems } = require("./contentParser");
const { analyze } = require("./analyzer");

const { mapFieldsToTargetFields } = require("./utils/fieldUtils");
const { importContent } = require("./importer");
const {
  CREATED_BY_ATTRIBUTE,
  UPDATED_BY_ATTRIBUTE,
  PUBLISHED_AT_ATTRIBUTE,
} = require("../constants/contentTypes");

const { getData } = require("./exporter");

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

    const {
      attributes,
      options: { draftAndPublish },
    } = target;

    const mappedItems = await mapFieldsToTargetFields({
      items,
      fields,
      attributes,
      user,
    });
    return importContent(target, mappedItems, {
      [CREATED_BY_ATTRIBUTE]: user,
      [UPDATED_BY_ATTRIBUTE]: user,
      [PUBLISHED_AT_ATTRIBUTE]: draftAndPublish && asDraft ? null : Date.now(),
    });
  },

  exportItems: async (ctx) => {
    const { target, type, options } = ctx.request.body;
    const { userAbility } = ctx.state;
    const exportItems = await getData(target.uid, options, userAbility);

    if (target.kind === "singleType") {
      return getContentFromItems({ items: exportItems[0], type });
    } else {
      return getContentFromItems({ items: exportItems, type });
    }
  },
};
