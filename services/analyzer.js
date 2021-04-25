const {
  getFieldsFromItems,
  getFormatFromField,
} = require("./utils/fieldUtils");

function analyze(items) {
  const fieldsFormats = {};
  const fieldNames = getFieldsFromItems(items);
  fieldNames.forEach((fieldName) => (fieldsFormats[fieldName] = []));

  items.forEach((item) => {
    fieldNames.forEach((fieldName) => {
      const fieldData = item[fieldName];

      // Missig data
      if ([null, undefined, ""].includes(fieldData)) return;

      const fieldFormat = getFormatFromField(fieldData);
      fieldsFormats[fieldName].push(fieldFormat);
    });
  });

  const fieldsInfo = {};
  Object.keys(fieldsFormats).map((fieldName) => {
    const fieldFormats = fieldsFormats[fieldName].map((value) =>
      value === "text" ? "string" : value
    );
    const uniqueFormats = new Set(fieldFormats);
    const format = uniqueFormats.size > 1 ? "mixed" : [...uniqueFormats][0];

    fieldsInfo[fieldName] = {
      count: fieldFormats.length,
      format,
    };
  });

  return fieldsInfo;
}

module.exports = { analyze };
