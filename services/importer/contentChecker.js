const { MANY_RELATIONS } = require("../../constants/relations");
const { importMediaFromUrl } = require("./importMediaFiles");
const { formats, types } = require("../lib/parser");

function getId(value) {
  if (formats.isNumber(value)) return value;
  if (formats.isObject(value) && value && value.id) return value.id;
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
    const urls = medias.filter((v) => types.isMediaUrl(v));
    const uploadedFiles = await Promise.all(
      urls.map((url) => importMediaFromUrl(url, user))
    );

    const ids = medias.map(getId).filter((v) => v !== null);
    const entities = await strapi.query("file", "upload").find({ id_in: ids });

    return [...uploadedFiles, ...entities.map(({ id }) => id)];
  } else {
    const media = Array.isArray(value) ? value[0] : value;

    // Upload url to plugin upload
    if (types.isMediaUrl(media)) {
      return importMediaFromUrl(media, user);
    }

    const id = getId(media);
    const entity = await strapi.query("file", "upload").findOne({ id });
    return entity ? entity.id : null;
  }
}

async function getValidSingleComponent(value, attributes, user) {
  const mappedComponent = {};
  for (const attr in attributes) {
    const element = value[attr];
    if (element) {
      let mappedElement = element;
      const { type, model, collection, plugin } = attributes[attr];
      if (plugin && plugin === "upload") {
        const multiple = collection && !model;
        mappedElement = await getValidMedia(element, { multiple }, user);
      } else if (model || collection) {
        const targetModel = collection || model;
        const relationType = collection && !model ? "manyWay" : "oneWay";
        mappedElement = await getValidRelations(element, {
          relationType,
          targetModel,
        });
      } else if (type === "component") {
        mappedElement = await getValidComponent(
          element,
          attributes[attr],
          user
        );
      }

      mappedComponent[attr] = mappedElement;
    }
  }

  return mappedComponent;
}
async function getValidComponent(value, attribute, user) {
  const { repeatable, component } = attribute;
  const { attributes } = strapi.components[component];

  if (repeatable) {
    const componentValues = Array.isArray(value) ? value : [value];
    return Promise.all(
      componentValues.map((val) =>
        getValidSingleComponent(val, attributes, user)
      )
    );
  } else {
    const componentValue = Array.isArray(value) ? value[0] : value;
    return getValidSingleComponent(componentValue, attributes, user);
  }
}

async function getValidDynamic(value, attribute, user) {
  const { components } = attribute;
  const dynamicValues = Array.isArray(value) ? value : [];

  return Promise.all(
    dynamicValues.map(async (dynamicComponent) => {
      const { __component } = dynamicComponent;
      if (
        !__component ||
        !components.includes(__component) ||
        !strapi.components[__component]
      ) {
        return null;
      }

      const { attributes } = strapi.components[__component];
      const content = await getValidSingleComponent(
        dynamicComponent,
        attributes,
        user
      );
      return { __component, ...content };
    })
  );
}

module.exports = {
  getValidRelations,
  getValidMedia,
  getValidComponent,
  getValidDynamic,
};
