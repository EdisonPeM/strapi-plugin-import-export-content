const { formats } = require("../dataParser");

function getId(value) {
  if (formats.isNumber(value)) return value;
  if (formats.isObject(value) && value && value.id) return value.id;
  return null;
}

function validateEntity(entity) {
  if (entity && entity.id) return entity.id;
  return null;
}

module.exports = { getId, validateEntity };
