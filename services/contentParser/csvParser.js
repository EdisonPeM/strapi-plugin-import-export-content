const {
  textIsNumber,
  textToNumber,
  textIsBoolean,
  textToBoolean,
  textIsObject,
  textToObject,
} = require("./textFormats");
const CsvParser = require("csv-parse/lib/sync");
const CSV = require("csv-string");

function csvToJson(text) {
  return CsvParser(text, {
    delimiter: CSV.detect(text),
    columns: true,
    trim: true,
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
