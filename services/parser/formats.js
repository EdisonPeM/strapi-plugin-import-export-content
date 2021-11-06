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

const booleanValues = {
  trueValues: ["true", "t"],
  falseValues: ["false", "f"],
};

function isBoolean(value) {
  if (typeof value === "boolean") return true;
  if (typeof value === "string") {
    return (
      booleanValues.trueValues.includes(value.toLowerCase()) ||
      booleanValues.falseValues.includes(value.toLowerCase())
    );
  }

  return false;
}

function isObject(value) {
  if (typeof value === "object") return true;
  if (typeof value === "string") {
    try {
      JSON.parse(value);
      return true;
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
