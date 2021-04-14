import React, { useState, useMemo, memo } from "react";
import PropTypes from "prop-types";
import { Prompt } from "react-router-dom";

import { Row } from "../common";
import { TableWrapper } from "./styles";
import { Button } from "@buffetjs/core";

import DataHeader from "./DataHeader";
import DataBody from "./DataBody";

const filterIgnoreFields = (fieldName) =>
  ![
    "id",
    "created_at",
    "created_by",
    "updated_at",
    "updated_by",
    "published_at",
  ].includes(fieldName);

// TODO: Support Relations
const filterIgnoreTypes = (type) => !["relation", "dynamiczone"].includes(type);

function DataMapper({ data, mapper, onSuccess, onCancel }) {
  const { fieldsInfo, parsedData } = data;
  const { kind, attributes, options } = mapper;

  const [uploadAsDraft, setUploadAsDraft] = useState(false);
  const toggleUploadAsDraft = () => setUploadAsDraft(!uploadAsDraft);

  const filteredAttributes = useMemo(
    () =>
      Object.keys(attributes)
        .filter(filterIgnoreFields)
        .filter((field) => filterIgnoreTypes(attributes[field].type)),
    [attributes]
  );

  // Manipulation over maping columns
  const [mappedFields, setMappedFields] = useState(
    fieldsInfo.reduce((mappedFields, { fieldName }) => {
      mappedFields[fieldName] = filteredAttributes.includes(fieldName)
        ? fieldName
        : "none";
      return mappedFields;
    }, {})
  );

  const selectDestinationField = (source) => ({ target: { value } }) => {
    setMappedFields({ ...mappedFields, [source]: value });
  };

  const destinationOptions = [{ label: "None", value: "none" }].concat(
    filteredAttributes.map((field) => ({ label: field, value: field }))
  );

  // Manipulation over Rows
  const [importItems, setImportItems] = useState(parsedData);
  const deleteItem = (item) => () => {
    const importItemsFiltered = importItems.filter(
      (importItems) => importItems !== item
    );
    setImportItems(importItemsFiltered);
  };

  // UploadData
  const handleUploadItems = () =>
    onSuccess({ fields: mappedFields, items: importItems });

  return (
    <div className="pt-3 col-12">
      <Prompt message="import.mapper.unsaved" />
      <Row>
        <h2>Map the Import Data to Destination Field</h2>
        <TableWrapper>
          <table>
            <DataHeader
              headersInfo={fieldsInfo}
              headersOptions={destinationOptions}
              headersValues={mappedFields}
              onSelectHeader={selectDestinationField}
            />
            <DataBody
              onlyFistRow={kind === "singleType"}
              rows={importItems}
              headers={fieldsInfo.map(({ fieldName }) => fieldName)}
              onDeleteItem={deleteItem}
            />
          </table>
        </TableWrapper>
      </Row>
      <Row>
        <span className="mr-3">Count of Items to Import:</span>
        <strong>{kind === "singleType" ? 1 : importItems.length}</strong>
      </Row>
      {options.draftAndPublish && (
        <Row>
          <label htmlfor="uploadAsDraft">
            <input
              name="uploadAsDraft"
              type="checkbox"
              value={uploadAsDraft}
              onChange={toggleUploadAsDraft}
            />
            <span className="ml-3">Upload as Draft</span>
          </label>
        </Row>
      )}
      <Row>
        <Button label="Import Data" onClick={handleUploadItems} />
        <Button
          className="ml-3"
          label="Cancel"
          color="delete"
          onClick={onCancel}
        />
      </Row>
    </div>
  );
}

DataMapper.defaultProps = {
  data: {},
  mapper: {},
  onSuccess: () => {},
  onCancel: () => {},
};

DataMapper.propTypes = {
  data: PropTypes.any,
  mapper: PropTypes.any,
  onSuccess: PropTypes.func,
  onCancel: PropTypes.func,
};

export default memo(DataMapper);
