const getErrorMessages = (error) => {
  const errorMessages = [];
  for (const key in error.data.errors){
    if (error.data.errors.hasOwnProperty(key)) {
      errorMessages.push(error.data.errors[key]);
    }
  }
  return errorMessages;
};

const importToCollectionType = async (uid, item) => {
  try {
    await strapi.entityService.create({ data: item }, { model: uid });
    // await strapi.query(uid).create(item);
    return true;
  } catch (error) {
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
    return [getErrorMessages(error)];
  }
};

module.exports = {
  importToCollectionType,
  importToSingleType,
};
