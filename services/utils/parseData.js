"use strict";

const CsvParser = require("csv-parse/lib/sync");
const contentTypeParser = require("content-type-parser");
const { getFieldNameSet } = require("./analyzer");

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

function getContentFromItems(items, type) {
  switch (type) {
    case "text/csv":
    case "application/vnd.ms-excel": {
      const mappedItems = Array.isArray(items) ? items : [items];
      const headers = Array.from(getFieldNameSet(mappedItems));

      const data = mappedItems
        .map((item) =>
          headers
            .map((header) => {
              const element = item[header];
              if (element === null || element == undefined) return "";
              if (typeof element === "object") return JSON.stringify(element);
              return element;
            })
            .join()
        )
        .join("\n");

      return headers.join().concat(`\n${data}`);
    }

    case "application/json":
    default:
      return JSON.stringify(items);
  }
}

module.exports = { getItemsFromData, parseItemsToModel, getContentFromItems };
