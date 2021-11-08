const { cast } = require("../dataParser");
const { isArray } = require("../dataParser/formats");

function toArray(value) {
  if (isArray(value)) return cast(value, "array");
  return [value];
}

function toSingle(values) {
  const validValue = toArray(values);
  const [firstValue] = validValue;
  return firstValue;
}

module.exports = {
  toArray,
  toSingle,
};
