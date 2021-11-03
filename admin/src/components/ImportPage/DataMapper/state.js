import { MapFields, MapHeaders, MapOptions } from "./utils";
import { IGNORE_FIELDS } from "../../../constants/contentTypes";

export function getInitialState(
  { parsedData, fieldsFormats },
  { attributes, options }
) {
  const hasDraftAndPublish = !!options?.draftAndPublish;

  const filteredAttributes = { ...attributes };
  IGNORE_FIELDS.forEach((fieldToIgnore) => {
    if (filteredAttributes.hasOwnProperty(fieldToIgnore)) {
      delete filteredAttributes[fieldToIgnore];
    }
  });

  const fields = Object.keys(filteredAttributes);
  const fieldsMapping = MapFields(fieldsFormats, filteredAttributes);
  const mapFields = Object.keys(fieldsFormats);

  return {
    attributes: filteredAttributes,
    asDraft: hasDraftAndPublish,
    items: parsedData,
    fields,
    mapFields,
    fieldsMapping,
  };
}
