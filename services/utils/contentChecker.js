const { isNumber, isString, urlIsMedia } = require("./formatsValidator");
const { MANY_RELATIONS } = require("../../constants/relations");
const { importMediaFromUrl } = require("./importMediaFiles");

function getId(value) {
  if (isNumber(value)) return parseInt(value);
  return value?.id || null;
}

async function getValidContent({ value, attribute, user }) {
  const { type } = attribute;

  if (type === "media") {
    const { multiple } = attribute;
    if (multiple) {
      if (!Array.isArray(value)) return [];
      const urls = value.filter((v) => isString(v) && urlIsMedia(v));
      const uploadedFiles = await Promise.all(
        urls.map((url) => importMediaFromUrl(url, user))
      );

      const ids = value.map(getId).filter((v) => v !== null);
      const entities = await strapi
        .query("file", "upload")
        .find({ id_in: ids });

      return [...uploadedFiles, ...entities.map(({ id }) => id)];
    } else {
      if (Array.isArray(value)) return null;

      // Upload url to plugin upload
      if (isString(value) && urlIsMedia(value)) {
        return importMediaFromUrl(value, user);
      }

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
