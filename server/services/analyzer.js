const {
  getFieldsFromItems,
  getFormatFromField,
} = require("./utils/fieldUtils");

const functions = () => ({
  analyze: (items) => {
    const fieldsFormats = {};
    const fieldNames = getFieldsFromItems(items);
    fieldNames.forEach((fieldName) => (fieldsFormats[fieldName] = []));

    items.forEach((item) => {
      fieldNames.forEach((fieldName) => {
        const fieldData = item[fieldName];

        // Get format from valid data
        if (fieldData !== null && fieldData !== undefined) {
          const fieldFormat = getFormatFromField(fieldData);
          fieldsFormats[fieldName].push(fieldFormat);
        }
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
})

module.exports = functions()
