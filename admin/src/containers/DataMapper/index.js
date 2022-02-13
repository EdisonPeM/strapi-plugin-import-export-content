import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Prompt } from "react-router-dom";

import { Button, Checkbox } from "@buffetjs/core";
import { Loader, Row } from "../../components/common";
import MappingTable from "../../components/MappingTable";

import { request } from "@strapi/helper-plugin";
import pluginId from "../../pluginId";

const filterIgnoreFields = (fieldName) =>
  ![
    "id",
    "created_at",
    "created_by",
    "updated_at",
    "updated_by",
    "published_at",
  ].includes(fieldName);

function DataMapper({ analysis, target, onImport }) {
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
    (source) => ({ target: { value } }) => {
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
  const deleteItem = useCallback((deleteItem) => () =>
    setImportItems((items) => items.filter((item) => item !== deleteItem))
  );

  // Upload Data
  const [isLoading, setIsLoadig] = useState(false);
  const uploadData = async () => {
    // Prevent Upload Empty Data;
    if (importItems.length === 0) {
      strapi.notification.toggle({
        type: "warning",
        message: "import.items.empty",
      });

      // Finish with the import
      return onImport();
    }

    try {
      setIsLoadig(true);
      const { message } = await request(`/${pluginId}/import`, {
        method: "POST",
        body: {
          target,
          fields: mappedFields,
          items: importItems,
          asDraft: uploadAsDraft,
        },
      });

      strapi.notification.toggle({ type: "info", message });
    } catch (error) {
      console.log(error);
      strapi.notification.toggle({
        type: "warning",
        message: `import.items.error`,
      });
    }

    setIsLoadig(false);
    onImport();
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="pt-3 col-12">
        <Prompt message="import.mapper.unsaved" />
        <Row>
          <h2>Map the Import Data to Destination Field</h2>
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
          <span className="mr-3">Count of Items to Import:</span>
          <strong>{kind === "singleType" ? 1 : importItems.length}</strong>
        </Row>
        {options.draftAndPublish && (
          <Row>
            <Checkbox
              message="Upload as Draft"
              name="uploadAsDraft"
              value={uploadAsDraft}
              onChange={() => setUploadAsDraft(!uploadAsDraft)}
            />
          </Row>
        )}
        <Row>
          <Button label="Import Data" onClick={uploadData} />
          <Button
            className="ml-3"
            label="Cancel"
            color="delete"
            onClick={() => onImport()}
          />
        </Row>
      </div>
    </>
  );
}

DataMapper.defaultProps = {
  analysis: {},
  target: {},
  onImport: () => {},
};

DataMapper.propTypes = {
  analysis: PropTypes.any,
  target: PropTypes.any,
  onImport: PropTypes.func,
};

export default DataMapper;
