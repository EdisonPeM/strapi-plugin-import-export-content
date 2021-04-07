"use strict";

const CsvParser = require("csv-parse/lib/sync");
const contentTypeParser = require("content-type-parser");

function getItemsFromData({ type, data }) {
  switch (type) {
    case "text/csv":
    case "application/vnd.ms-excel":
      const items = CsvParser(data, { columns: true });
      return { sourceType: "csv", items };

    case "application/json":
      return { sourceType: "json", items: JSON.parse(data) };

    default:
      const parsedContentType = contentTypeParser(type);
      const contentType = parsedContentType.toString();
      return { contentType };
  }
}

module.exports = { getItemsFromData };
