const { MANY_RELATIONS } = require("../../constants/relations");
const { urlIsMedia } = require("./formatsValidator");
const { importMediaFromUrl } = require("../importer/importMediaFiles");

function getId(value) {
  if (typeof value === "number") return value;
  if (typeof value === "object" && value.id) return value.id;
  return null;
}

async function getValidRelations(value, attribute) {
  const { relationType, targetModel } = attribute;
  if (MANY_RELATIONS.includes(relationType)) {
    const relations = Array.isArray(value) ? value : [value];
    const ids = relations.map(getId);
    const entities = await strapi.query(targetModel).find({ id_in: ids });
    return entities.map(({ id }) => id);
  } else {
    const relation = Array.isArray(value) ? value[0] : value;
    const id = getId(relation);
    const entity = await strapi.query(targetModel).findOne({ id });
    return entity ? entity.id : null;
  }
}

async function getValidMedia(value, attribute, user) {
  const { multiple } = attribute;
  if (multiple) {
    const medias = Array.isArray(value) ? value : [value];
    const urls = medias.filter((v) => urlIsMedia(v));
    const uploadedFiles = await Promise.all(
      urls.map((url) => importMediaFromUrl(url, user))
    );

    const ids = medias.map(getId).filter((v) => v !== null);
    const entities = await strapi.query("file", "upload").find({ id_in: ids });

    return [...uploadedFiles, ...entities.map(({ id }) => id)];
  } else {
    const media = Array.isArray(value) ? value[0] : value;

    // Upload url to plugin upload
    if (urlIsMedia(media)) {
      return importMediaFromUrl(media, user);
    }

    const id = getId(media);
    const entity = await strapi.query("file", "upload").findOne({ id });
    return entity ? entity.id : null;
  }
}

module.exports = {
  getValidRelations,
  getValidMedia,
};
