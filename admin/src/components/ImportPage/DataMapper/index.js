import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Prompt } from "react-router-dom";

import { Button, Checkbox } from "@buffetjs/core";
import { Row } from "../../common";
import MappingTable from "../MappingTable";

import useTrads from "../../../hooks/useTrads";

import { warningNotify } from "../../../utils/notifications";

const filterIgnoreFields = (fieldName) =>
  !["id", "created_by", "updated_by"].includes(fieldName);

function DataMapper({ analysis, target, onSubmit, onFail }) {
  const t = useTrads();

  const { fieldsInfo, parsedData } = analysis;
  const { kind, attributes, options } = target;

  const isSingleType = kind === "singleType";
  const [uploadAsDraft, setUploadAsDraft] = useState(options.draftAndPublish);

  const filteredAttributes = useMemo(
    () => Object.keys(attributes).filter(filterIgnoreFields),
    [attributes]
  );

  const [mappedFields, setMappedFields] = useState(() => {
    const fields = {};
    Object.keys(fieldsInfo).forEach((field) => {
      const { format } = fieldsInfo[field];
      const targetField = filteredAttributes.includes(field) ? field : "none";
      const targetFormat = attributes[targetField]
        ? attributes[targetField].type
        : null;

      fields[field] = { format, targetField, targetFormat };
    });
    return fields;
  });

  // Mapping Table Headers
  const headers = useMemo(
    () =>
      Object.keys(mappedFields).map((field) => ({
        name: field,
        format: mappedFields[field].format,
        value: mappedFields[field].targetField,
      })),
    [mappedFields]
  );

  // Options to Map
  const destinationOptions = useMemo(
    () =>
      [{ label: "None", value: "none" }].concat(
        filteredAttributes.map((field) => ({ label: field, value: field }))
      ),
    [filteredAttributes]
  );

  // Handler Mapping
  const selectDestinationField = useCallback(
    (source) =>
      ({ target: { value } }) => {
        setMappedFields((fields) => ({
          ...fields,
          [source]: {
            ...fields[source],
            targetField: value,
            targetFormat: value !== "none" ? attributes[value].type : undefined,
          },
        }));
      },
    [attributes]
  );

  // Mapping Table Rows
  const [importItems, setImportItems] = useState(parsedData);
  const deleteItem = useCallback(
    (deleteItem) => () =>
      setImportItems((items) => items.filter((item) => item !== deleteItem))
  );

  // Upload Data
  const uploadData = async () => {
    // Prevent Upload Empty Data;
    if (importItems.length === 0) {
      warningNotify(t("import.items.empty"));
      return onFail();
    }

    onSubmit({
      fields: mappedFields,
      items: importItems,
      asDraft: uploadAsDraft,
    });
  };

  return (
    <div className="pt-3 col-12">
      <Prompt message={t("import.mapper.unsaved")} />
      <Row>
        <h3>{t("import.mapper.title")}</h3>
        <MappingTable
          mappingHeaders={headers}
          mappingRows={importItems}
          mappingRowsHeaders={importItems}
          headersMappingOptions={destinationOptions}
          onChangeMapping={selectDestinationField}
          onDeleteRow={deleteItem}
          onlyFistRow={isSingleType}
        />
      </Row>
      <Row>
        <span className="mr-3">{t("import.mapper.count")}:</span>
        <strong>{kind === "singleType" ? 1 : importItems.length}</strong>
      </Row>
      {options.draftAndPublish && (
        <Row>
          <Checkbox
            // Change the message from "upload as draft" to "upload and publish"
            message={t("import.mapper.publish")}
            name="uploadAsDraft"
            value={!uploadAsDraft}
            onChange={() => setUploadAsDraft(!uploadAsDraft)}
          />
        </Row>
      )}
      <Row>
        <Button label={t("import.mapper.import")} onClick={uploadData} />
        <Button
          className="ml-3"
          label={t("import.mapper.cancel")}
          color="delete"
          onClick={() => onFail()}
        />
      </Row>
    </div>
  );
}

DataMapper.defaultProps = {
  analysis: {},
  target: {},
  onSubmit: () => {},
  onFail: () => {},
};

DataMapper.propTypes = {
  analysis: PropTypes.any,
  target: PropTypes.any,
  onSubmit: PropTypes.func,
  onFail: PropTypes.func,
};

export default DataMapper;
