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

    // Try to convert the format of the values
    cast: (value) => {
      if (value === "") return null;
      else if (textIsNumber(value)) return textToNumber(value);
      else if (textIsBoolean(value)) return textToBoolean(value);
      else if (textIsObject(value)) return textToObject(value);
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
