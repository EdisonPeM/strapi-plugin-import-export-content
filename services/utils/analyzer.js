"use strict";

const _ = require("lodash");
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
  fieldNames.forEach((fieldName) => (fieldsFormats[fieldName] = []));

  items.forEach((item) => {
    fieldNames.forEach((fieldName) => {
      const fieldData = item[fieldName];
      const fieldFormat = detectFieldFormat(fieldData);
      if (fieldFormat !== undefined) fieldsFormats[fieldName].push(fieldFormat);
    });
  });

  const fieldsInfo = Object.keys(fieldsFormats).map((fieldName) => {
    const fieldFormats = fieldsFormats[fieldName];
    const fieldInfo = { fieldName, count: fieldFormats.length };

    try {
      fieldInfo.format = _.chain(fieldFormats)
        .countBy((f) => f)
        .map((value, key) => ({
          count: value,
          type: key,
        }))
        .sortBy("count")
        .reverse()
        .head()
        .get("type")
        .value();
    } catch (e) {
      console.log(e);
    }

    return fieldInfo;
  });

  return fieldsInfo;
}

module.exports = { getFieldNameSet, analyze };
