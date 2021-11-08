const { cast } = require("../../dataParser");
const { toArray, toSingle } = require("../../utils/arrays");

const validateRelations = require("./relations");
const validateMedias = require("./medias");

// Misc Functions
const isMedia = (attribute) => {
  const { plugin } = attribute;
  return plugin && plugin === "upload";
};

const isRelation = (attribute) => {
  const { model, collection } = attribute;
  return model || collection;
};

const isComponent = (attribute) => {
  const { component, type } = attribute;
  return component && type === "component";
};

async function getValidComponent(component, compUid) {
  const strapiComponent = strapi.components[compUid];
  if (!strapiComponent) return null;

  const { attributes } = strapiComponent;
  const attributesEntries = Object.entries(attributes);

  const mappedComponent = {};
  await Promise.all(
    attributesEntries.map(async ([attr, attribute]) => {
      const value = component[attr];
      if (!value) return;

      if (isMedia(attribute)) {
        const { model, collection } = attribute;
        const isMultiple = collection && !model;
        mappedComponent[attr] = await validateMedias(value, isMultiple);
        return;
      }

      if (isRelation(attribute)) {
        const { model, collection } = attribute;
        const targetModel = collection || model;
        const isMultiple = collection && !model;
        mappedComponent[attr] = await validateRelations(
          value,
          targetModel,
          isMultiple
        );
        return;
      }

      if (isComponent(attribute)) {
        const { component, repeatable } = attribute;
        mappedComponent[attr] = await validateComponent(
          value,
          component,
          repeatable
        );
        return;
      }

      mappedComponent[attr] = value;
    })
  );

  return mappedComponent;
}

async function validateComponent(value, compUid, isMultiple = false) {
  const parsedValue = cast(value, "object");
  if (!parsedValue) return null;

  if (isMultiple) {
    const components = toArray(parsedValue);
    return Promise.all(
      components.map((comp) => getValidComponent(comp, compUid))
    );
  } else {
    const component = toSingle(parsedValue);
    return getValidComponent(component, compUid);
  }
}

module.exports = validateComponent;
