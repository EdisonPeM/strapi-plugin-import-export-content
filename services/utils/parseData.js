"use strict";

const CsvParser = require("csv-parse/lib/sync");
const contentTypeParser = require("content-type-parser");

function getItemsFromData({ type, data }) {
  switch (type) {
    case "text/csv":
    case "application/vnd.ms-excel": {
      const items = CsvParser(data, { columns: true });
      return { sourceType: "csv", items };
    }

    case "application/json": {
      const items = JSON.parse(data);
      return {
        sourceType: "json",
        items: Array.isArray(items) ? items : [items],
      };
    }

    default:
      const parsedContentType = contentTypeParser(type);
      const contentType = parsedContentType.toString();
      return { contentType };
  }
}

function parseItemsToModel(items, fields) {
  const mappedItems = items.map((item) =>
    Object.keys(item).reduce((mappedItem, key) => {
      const mappedKey = fields[key];
      if (mappedKey !== "none") mappedItem[mappedKey] = item[key];
      return mappedItem;
    }, {})
  );

  return mappedItems;
}

module.exports = { getItemsFromData, parseItemsToModel };
