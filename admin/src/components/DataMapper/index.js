import React, { useState, useMemo, memo } from "react";
import PropTypes from "prop-types";

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
  const { uid, attributes } = mapper;

  // Manipulation over maping columns
  const [mappedFields, setMappedFields] = useState(
    fieldsInfo.reduce((mappedFields, { fieldName }) => {
      mappedFields[fieldName] = attributes[fieldName] ? fieldName : "none";
      return mappedFields;
    }, {})
  );

  const selectDestinationField = (source) => ({ target: { value } }) => {
    setMappedFields({ ...mappedFields, [source]: value });
  };

  const destinationOptions = useMemo(
    () =>
      [{ label: "None", value: "none" }].concat(
        Object.keys(attributes)
          .filter(filterIgnoreFields)
          .filter((field) => filterIgnoreTypes(attributes[field].type))
          .map((field) => ({
            label: field,
            value: field,
          }))
      ),
    [attributes]
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
    onSuccess({ uid, fields: mappedFields, importItems });

  return (
    <div className="pt-3 col-12">
      <Row>
        <h2>Map the Import Data to Destination Field</h2>
        <TableWrapper>
          <table>
            <DataHeader
              headers={fieldsInfo.map(({ fieldName }) => fieldName)}
              headersOptions={destinationOptions}
              headersValues={mappedFields}
              onSelectHeader={selectDestinationField}
            />
            <DataBody
              rows={importItems}
              headers={fieldsInfo.map(({ fieldName }) => fieldName)}
              onDeleteItem={deleteItem}
            />
          </table>
        </TableWrapper>
      </Row>
      <Row>
        Count of Items to Import: <strong>{importItems.length}</strong>
      </Row>
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
