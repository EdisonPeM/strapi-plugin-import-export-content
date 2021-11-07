const { ATTRIBUTES, TYPES } = require("../../constants/contentTypes");

const importToCollectionType = async (uid, item) => {
  try {
    await strapi.entityService.create({ data: item }, { model: uid });
    // await strapi.query(uid).create(item);
    return true;
  } catch (error) {
    return false;
  }
};

const importToSingleType = async (uid, item) => {
  try {
    const existing = await strapi.query(uid).find({});
    if (existing.length > 0) {
      const { id } = existing[0];
      delete item[ATTRIBUTES.CREATED_BY];
      await strapi.query(uid).update({ id }, item);
    } else {
      strapi.query(uid).create(item);
    }
    return [true];
  } catch (error) {
    return [false];
  }
};

function getImporter(kind) {
  switch (kind) {
    case TYPES.COLLECTION: {
      return importToCollectionType;
    }

    case TYPES.SINGLE: {
      return importToSingleType;
    }

    default: {
      throw new Error("Target kind is not supported");
    }
  }
}

module.exports = {
  importToCollectionType,
  importToSingleType,
  getImporter,
};
