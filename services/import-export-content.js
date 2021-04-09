"use strict";

/**
 * import-export-content.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const { getItemsFromData } = require("./utils/parseData");
const { analyze } = require("./utils/analyzer");

module.exports = {
  preAnalyzeContent: (ctx) => {
    const { data, type } = ctx.request.body;
    const { sourceType, items } = getItemsFromData({ data, type });
    const itemCount = items.length;
    const fieldsInfo = analyze(items);
    return { itemCount, sourceType, fieldsInfo, parsedData: items };
  },
};
