const { BOOLEAN_VALUES } = require("./constants");
const types = require("./types");

// formats
function isString(value) {
  return typeof value === "string";
}

function isNumber(value) {
  if (typeof value === "number") return true;
  if (typeof value === "string") {
    if (value !== "") return !isNaN(value);
  }

  return false;
}

function isBoolean(value) {
  if (typeof value === "boolean") return true;
  if (typeof value === "string") {
    return (
      BOOLEAN_VALUES.trueValues.includes(value.toLowerCase()) ||
      BOOLEAN_VALUES.falseValues.includes(value.toLowerCase())
    );
  }

  return false;
}

function isObject(value) {
  if (typeof value === "object") return true;
  if (typeof value === "string") {
    try {
      const obj = JSON.parse(value);
      return typeof obj === "object";
    } catch {
      return false;
    }
  }

  return false;
}

function isArray(value) {
  if (typeof value === "object") return Array.isArray(value);
  if (typeof value === "string") {
    try {
      const parsedValue = JSON.parse(value);
      return Array.isArray(parsedValue);
    } catch {
      return false;
    }
  }

  return false;
}

function isDate(value) {
  if (value instanceof Date) return isNumber(value);
  if (typeof value === "number") return true; // Case of Miliseconds??
  if (typeof value === "string") {
    return types.isDate(value);
  }

  return false;
}

module.exports = {
  isString,
  isNumber,
  isBoolean,
  isDate,
  isArray,
  isObject,
};
