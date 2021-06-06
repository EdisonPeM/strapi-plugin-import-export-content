const {
  isNumber,
  isBoolean,
  isString,
  isObject,
} = require("./formatsValidator");
const CsvParser = require("csv-parse/lib/sync");
const CSV = require("csv-string");

function csvToJson(text) {
  return CsvParser(text, {
    delimiter: CSV.detect(text),
    columns: true,
    trim: true,

    // Try to convert the format of the values
    cast: (value) => {
      if (isNumber(value)) return parseFloat(value);
      else if (isBoolean(value))
        if (isString(value)) return value === "true";
        else return value;
      else if (isObject(value)) return JSON.parse(value);
      else return value;
    },
  });
}

function jsonToCsv(data, headers) {
  const escapeQuote = (text) => text.replace(/\"/g, '""');
  return headers
    .map((header) => {
      const element = data[header];
      if (element === null || element == undefined) return "";

      if (typeof element === "object") {
        const textObject = JSON.stringify(element);
        return `"${escapeQuote(textObject)}"`;
      }

      if (
        typeof element === "string" &&
        (element.includes("\n") ||
          element.includes(",") ||
          element.includes('"'))
      ) {
        return `"${escapeQuote(element)}"`;
      }

      return element;
    })
    .join();
}

module.exports = {
  csvToJson,
  jsonToCsv,
};
