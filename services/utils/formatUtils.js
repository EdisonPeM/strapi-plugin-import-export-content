function isString(text) {
  return typeof text === "string";
}

function isNumber(number) {
  return number !== null && number !== "" && !isNaN(number);
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

module.exports = {
  isString,
  isNumber,
  isBoolean,
  isObject,
  isArray,
};
