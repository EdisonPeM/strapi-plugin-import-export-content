const {
  COLLECTION_TYPE,
  SINGLE_TYPE,
} = require("../../constants/contentTypes");
const { importToCollectionType, importToSingleType } = require("./importUtils");

async function importContent(target, items, options, allowUpdateDelete) {
  const { uid, kind } = target;
  switch (kind) {
    case COLLECTION_TYPE:
      for (let i = 0; i < items.length; i++) {
        await importToCollectionType(uid, {
          ...items[i],
          ...options,
        }, allowUpdateDelete);
      }

    case SINGLE_TYPE:
      return await importToSingleType(uid, {
        ...items[0],
        ...options,
      });

    default:
      throw new Error("Tipe is not supported");
  }
}

module.exports = {
  importContent,
};
