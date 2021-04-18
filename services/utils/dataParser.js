"use strict";

const CsvParser = require("csv-parse/lib/sync");
const CSV = require("csv-string");

const { getFieldNameSet } = require("./analyzer");
const { isString, isNumber, isBoolean, isObject } = require("./formatUtils");

// General Parsers
function csvToObject(text) {
  const items = CsvParser(text, {
    delimiter: CSV.detect(text),
    columns: true,
    trim: true,
    skip_lines_with_error: true,
    cast: (value) => {
      if (isNumber(value)) return parseFloat(value);
      else if (isBoolean(value))
        if (isString(value)) return value === "true";
        else return value;
      else if (isObject(value)) return JSON.parse(value);
      else return value;
    },
  });

  return items;
}

function objectToCsv(object, headers) {
  const escapeQuote = (text) => text.replace(/\"/g, '""');
  return headers
    .map((header) => {
      const element = object[header];
      if (element === null || element == undefined) return "";

      if (typeof element === "object") {
        const textObject = JSON.stringify(element);
        return `"${escapeQuote(textObject)}"`;
      }

      if (
        typeof element === "string" &&
        (element.includes(",") || element.includes('"'))
      ) {
        return `"${escapeQuote(element)}"`;
      }

      return element;
    })
    .join();
}

// Specific Parsers
function getItemsFromContent({ type, data }) {
  switch (type) {
    case "text/csv":
    case "application/vnd.ms-excel": {
      return csvToObject(data);
    }

    case "application/json":
    default: {
      const items = JSON.parse(data);
      return Array.isArray(items) ? items : [items];
    }
  }
}

function getContentFromItems(items, type) {
  switch (type) {
    case "text/csv":
    case "application/vnd.ms-excel": {
      const mappedItems = Array.isArray(items) ? items : [items];
      const headers = Array.from(getFieldNameSet(mappedItems));
      const data = mappedItems
        .map((item) => objectToCsv(item, headers))
        .join("\n");

      return `${headers.join()}\n${data}`;
    }

    case "application/json":
    default:
      return JSON.stringify(items);
  }
}

function mapItemToModel(item, fields, ctx) {
  const mappedItem = {};

  const { target } = ctx.request.body;
  const { userAbility } = ctx.state;
  const permissionsManager = strapi.admin.services.permission.createPermissionsManager(
    { ability: userAbility, model: target.uid }
  );

  Object.keys(item).forEach((key) => {
    const { targetField, format, targetFormat } = fields[key];
    if (targetField && targetField !== "none") {
      // try to Cast Formats
      mappedItem[targetField] = item[key];
    }
  });

  const itemSanitizado = permissionsManager.sanitize(mappedItem, {
    subject: mappedItem,
    action: "plugins::content-manager.explorer.create",
    isOutput: false,
  });

  console.log(itemSanitizado);
  console.log(mappedItem);

  return mappedItem;
}

module.exports = {
  getItemsFromContent,
  getContentFromItems,
  mapItemToModel,
};
