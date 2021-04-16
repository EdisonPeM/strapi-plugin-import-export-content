"use strict";

const { detectFieldFormat } = require("./fieldUtils");

function getFieldNameSet(items) {
  const fieldNames = new Set();
  items.forEach((item) => {
    try {
      Object.keys(item).forEach((fieldName) => fieldNames.add(fieldName));
    } catch (err) {
      console.error(err);
    }
  });
  return fieldNames;
}

function analyze(items) {
  const fieldNames = getFieldNameSet(items);
  const fieldsFormats = {};
  const subFormats = {};
  fieldNames.forEach((fieldName) => {
    fieldsFormats[fieldName] = [];
    subFormats[fieldName] = [];
  });

  items.forEach((item) => {
    fieldNames.forEach((fieldName) => {
      const fieldData = item[fieldName];
      if (fieldData !== null && fieldData !== undefined && fieldData !== "") {
        const fieldFormat = detectFieldFormat(fieldData);
        fieldsFormats[fieldName].push(fieldFormat);
      }
    });
  });

  const fieldsInfo = Object.keys(fieldsFormats).map((fieldName) => {
    const fieldFormats = fieldsFormats[fieldName].map((value) =>
      value === "text" ? "string" : value
    );
    const uniqueFormats = new Set(fieldFormats);
    const format = uniqueFormats.size > 1 ? "mixed" : [...uniqueFormats][0];

    return {
      fieldName,
      count: fieldFormats.length,
      format,
    };
  });

  return fieldsInfo;
}

module.exports = { getFieldNameSet, analyze };
