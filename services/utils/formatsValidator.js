// Basic Types
function isString(text) {
  return typeof text === "string";
}

function isNumber(number) {
  if (typeof number === "number" || typeof number === "bigint") {
    return true;
  }

  if (typeof number === "string" && number.trim() !== "") {
    return !isNaN(number);
  }

  return false;
}

function isBoolean(bool) {
  return ["true", "false", true, false].includes(bool);
}

function isObject(text) {
  try {
    JSON.parse(text);
    return true;
  } catch (error) {
    return false;
  }
}

function isArray(text) {
  if (isObject(text)) return Array.isArray(JSON.parse(text));
  return false;
}

const DATE_ISO_REGEXP = /^(\d{4})(-(\d{2}))??(-(\d{2}))??(T(\d{2}):(\d{2})(:(\d{2}))??(\.(\d+))??(([\+\-]{1}\d{2}:\d{2})|Z)??)??$/;
function stringIsDate(data) {
  DATE_ISO_REGEXP.lastIndex = 0;
  return DATE_ISO_REGEXP.test(data);
}

// Validate String Formats
const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function stringIsEmail(data) {
  EMAIL_REGEXP.lastIndex = 0;
  return EMAIL_REGEXP.test(data);
}

const HOUR_REGEXP = /^((?:(?:0|1)\d|2[0-3])):([0-5]\d):([0-5]\d)(\.\d{3})?$/;
function stringIsHour(data) {
  HOUR_REGEXP.lastIndex = 0;
  return HOUR_REGEXP.test(data);
}

const URL_REGEXP = /^[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?$/;
function stringIsUrl(data) {
  URL_REGEXP.lastIndex = 0;
  return URL_REGEXP.test(data);
}

function urlIsMedia(url) {
  try {
    const parsed = new URL(url);
    const extension = parsed.pathname.split(".").pop().toLowerCase();
    switch (extension) {
      case "png":
      case "gif":
      case "jpg":
      case "jpeg":
      case "svg":
      case "bmp":
      case "tif":
      case "tiff":
        return true;
      case "mp3":
      case "wav":
      case "ogg":
        return true;
      case "mp4":
      case "avi":
        return true;
      default:
        return false;
    }
  } catch (error) {
    return false;
  }
}

module.exports = {
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
  stringIsEmail,
  stringIsDate,
  stringIsHour,
  stringIsUrl,
  urlIsMedia,
};
