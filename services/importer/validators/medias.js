const { toArray, toSingle } = require("../../utils/arrays");
const { getId, validateEntity } = require("../../utils/entities");

async function validateMedias(value, isMultiple) {
  if (isMultiple) {
    const medias = toArray(value);
    const ids = medias.map(getId).filter((id) => id !== null);
    const entities = await strapi.query("file", "upload").find({ id_in: ids });
    return entities.map(validateEntity);
  } else {
    const media = toSingle(value);
    const id = getId(media);
    if (!id) return null;
    const entity = await strapi.query("file", "upload").findOne({ id });
    return validateEntity(entity);
  }
}

module.exports = validateMedias;
