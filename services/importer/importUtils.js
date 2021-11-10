const {
  CREATED_BY_ATTRIBUTE,
  UPDATED_BY_ATTRIBUTE,
  PUBLISHED_AT_ATTRIBUTE,
  ID_ATTRIBUTE,
} = require("../../constants/contentTypes");

const getErrorMessages = (error) => {
  const errorMessages = [];
  for (const key in error.data.errors){
    if (error.data.errors.hasOwnProperty(key)) {
      errorMessages.push(error.data.errors[key]);
    }
  }
  return errorMessages;
};

const importToCollectionType = async (uid, item, allowUpdateDelete) => {
  try {
    const id = item[ID_ATTRIBUTE];
    if (allowUpdateDelete && id) {
      const existing = await strapi.query(uid).find({ [ID_ATTRIBUTE]: id });
      if (existing.length > 0) {
        const params = { [ID_ATTRIBUTE]: id };
        if (item.operation_delete) {
          await strapi.entityService.delete({ data: item, params }, { model: uid });
          return true;
        } else {
          await strapi.entityService.update({ data: item, params }, { model: uid });
          return true;
        }
      }
    }
    await strapi.entityService.create({ data: item }, { model: uid });
    // await strapi.query(uid).create(item);
    return true;
  } catch (error) {
    console.error(error);
    return getErrorMessages(error);
  }
};

const importToSingleType = async (uid, item) => {
  try {
    const existing = await strapi.query(uid).find({});
    if (existing.length > 0) {
      const { id } = existing[0];
      delete item.created_by;
      await strapi.query(uid).update({ id }, item);
    } else {
      strapi.query(uid).create(item);
    }
    return [true];
  } catch (error) {
    return getErrorMessages(error);
  }
};

module.exports = {
  importToCollectionType,
  importToSingleType,
};
