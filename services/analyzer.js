const { getFormatFromField } = require("./utils/fieldUtils");

function analyze(items = []) {
  const fieldsFormats = {};

  items.forEach((item) => {
    Object.keys(item).forEach((fieldName) => {
      const data = item[fieldName];
      const format = getFormatFromField(data);
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

module.exports = { analyze };
