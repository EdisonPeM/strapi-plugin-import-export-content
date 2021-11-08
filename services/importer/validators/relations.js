const { toArray, toSingle } = require("../../utils/arrays");
const { getId, validateEntity } = require("../../utils/entities");

async function validateRelations(value, model, isMultiple) {
  if (isMultiple) {
    const relations = toArray(value);
    const ids = relations.map(getId).filter((id) => id !== null);
    const entities = await strapi.query(model).find({ id_in: ids });
    return entities.map(validateEntity);
  } else {
    const relation = toSingle(value);
    const id = getId(relation);
    if (!id) return null;

    const entity = await strapi.query(model).findOne({ id });
    return validateEntity(entity);
  }
}

module.exports = validateRelations;
