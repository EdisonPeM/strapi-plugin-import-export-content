"use strict";

/**
 * import-export-content.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const { getItemsFromContent, getContentFromItems } = require("./contentParser");
const { analyze } = require("./analyzer");

const { ATTRIBUTES } = require("../constants/contentTypes");
const { mapAndImport } = require("./importer");

const { getData } = require("./exporter");

module.exports = {
  preAnalyzeContent: (ctx) => {
    const { data, type } = ctx.request.body;
    const parsedData = getItemsFromContent({ data, type });
    const fieldsFormats = analyze(parsedData);
    return { fieldsFormats, parsedData };
  },

  importItems: async (ctx) => {
    const { user } = ctx.state;
    const { target, items, fieldsMapping, asDraft } = ctx.request.body;

    const {
      options: { draftAndPublish },
    } = target;

    const PUBLISHED_AT = draftAndPublish && asDraft ? null : Date.now();
    const otherFields = {
      [ATTRIBUTES.CREATED_BY]: user.id,
      [ATTRIBUTES.UPDATED_BY]: user.id,
      [ATTRIBUTES.PUBLISHED_AT]: PUBLISHED_AT,
    };

    return mapAndImport({
      user,
      target,
      items,
      fieldsMapping,
      otherFields,
    });
  },

  exportItems: async (ctx) => {
    const { target, type, options } = ctx.request.body;
    const { userAbility } = ctx.state;
    const exportItems = await getData(target, options, userAbility);

    if (target.kind === "singleType") {
      return getContentFromItems({ items: exportItems[0], type });
    } else {
      return getContentFromItems({ items: exportItems, type });
    }
  },
};
