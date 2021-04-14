"use strict";

const {
  stringIsEmail,
  stringIsDate,
  stringIsHour,
  stringIsUrl,
  urlIsMedia,
} = require("./formatValidator");

const detectFieldFormat = (data) => {
  switch (typeof data) {
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "object":
      if (Array.isArray(data)) return "array";
      return "object";
    case "string":
      return detectStringFieldFormat(data);
  }
};

const detectStringFieldFormat = (data) => {
  if (stringIsEmail(data)) return "email";
  if (stringIsDate(data)) return "date";
  if (stringIsHour(data)) return "hour";
  if (stringIsUrl(data)) {
    if (urlIsMedia(data)) return "media";
    return "url";
  }
  if (data.length > 255) return "text";
  return "string";
};

module.exports = { detectFieldFormat };
