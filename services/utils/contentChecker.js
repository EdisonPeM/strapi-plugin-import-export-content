const { isNumber } = require("./formatsValidator");
const { MANY_RELATIONS } = require("../../constants/relations");

function getId(value) {
  if (typeof value === "object") return value.id || null;
  if (isNumber(value)) return parseInt(value);
  return null;
}

async function getValidContent({ value, attribute }) {
  const { type } = attribute;

  if (type === "media") {
    const { multiple } = attribute;
    if (multiple) {
      if (!Array.isArray(value)) return [];
      const ids = value.map(getId);
      const entities = await strapi
        .query("file", "upload")
        .find({ id_in: ids });
      console.log();
      return entities.map(({ id }) => id);
    } else {
      if (Array.isArray(value)) return null;
      const id = getId(value);
      const entity = await strapi.query("file", "upload").findOne({ id });
      return entity?.id || null;
    }
  }

  if (type === "relation") {
    const { relationType, targetModel } = attribute;

    if (MANY_RELATIONS.includes(relationType)) {
      if (!Array.isArray(value)) return [];
      const ids = value.map(getId);

      const entities = await strapi.query(targetModel).find({ id_in: ids });
      return entities.map(({ id }) => id);
    } else {
      if (Array.isArray(value)) return null;

      const id = getId(value);
      const entity = await strapi.query(targetModel).findOne({ id });
      return entity?.id || null;
    }
  }

  // Other types are not validated
  return value;
}

module.exports = {
  getValidContent,
};
