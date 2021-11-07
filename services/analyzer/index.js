const { formats, types } = require("../dataParser");

function analizeFormat(value) {
  // Formats
  if (formats.isNumber(value)) return "number";
  if (formats.isBoolean(value)) return "boolean";

  if (formats.isDate(value)) return "date";
  if (formats.isArray(value)) return "array";
  if (formats.isObject(value)) return "object";

  // String Types
  if (types.isEmail(value)) return "email";
  if (types.isTime(value)) return "time";
  if (types.isMediaUrl(value)) return "media";
  if (types.isUrl(value)) return "url";

  // Default Format
  // if (value.length > 255) return "text";
  return "string";
}

function analyze(items = []) {
  const fieldsFormats = {};

  items.forEach((item) => {
    Object.keys(item).forEach((fieldName) => {
      const data = item[fieldName];
      const format = analizeFormat(data);
      const fieldFormats = fieldsFormats[fieldName];

      // If no array exists for this fieldName, then it is created
      if (!fieldFormats) {
        fieldsFormats[fieldName] = [format];

        // If the fieldsFormats array exists for this fieldName,
        // and does not include this format then it is added
      } else if (!fieldFormats.includes(format)) {
        fieldsFormats[fieldName] = fieldFormats.concat(format);
      }
    });
  });

  return fieldsFormats;
}

module.exports = { analyze, analizeFormat };
