const { relations } = require("strapi-utils");
const { constants } = relations;
const { MANY_RELATIONS } = constants;

const SINGLE_RELATIONS = ["oneWay", "oneToOne"];

module.exports = {
  MANY: MANY_RELATIONS,
  SINGLE: SINGLE_RELATIONS,
};
