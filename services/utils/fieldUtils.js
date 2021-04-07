"use strict";

const getUrls = require("get-urls");
const { urlIsMedia, stringIsEmail } = require("./formatValidator");

const detectFieldFormat = (data) => {
  switch (typeof data) {
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "object":
      return "object";
    case "string":
      return detectStringFieldFormat(data);
  }
};

const detectStringFieldFormat = (data) => {
  if (new Date(data).toString() !== "Invalid Date") return "date";
  if (stringIsEmail(data)) return "email";
  return "string";
};

const getMediaUrlsFromFieldData = (fieldData) => {
  switch (typeof fieldData) {
    case "string":
      return Array.from(getUrls(fieldData)).filter(urlIsMedia);
    case "object":
      return urlIsMedia(fieldData.url) ? [fieldData.url] : [];
  }
};
module.exports = {
  detectStringFieldFormat,
  detectFieldFormat,
  getMediaUrlsFromFieldData,
};
