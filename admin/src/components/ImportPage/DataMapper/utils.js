export function MapFields(fieldsFormats = {}, attributes = {}) {
  const mappedFields = {};

  Object.entries(fieldsFormats).forEach(([field, formats]) => {
    const existField = attributes.hasOwnProperty(field);
    const targetField = existField ? field : "none";
    const targetFormat = existField ? attributes[field].type : null;
    mappedFields[field] = { formats, targetField, targetFormat };
  });

  return mappedFields;
}

export function MapHeaders(mappedFields) {
  const fieldsEntries = Object.entries(mappedFields);
  return fieldsEntries.map(([name, { formats, targetField }]) => ({
    name,
    formats,
    value: targetField,
  }));
}

export function MapOptions(fields) {
  return [{ label: "None", value: "none" }].concat(
    fields.map((field) => ({ label: field, value: field }))
  );
}
