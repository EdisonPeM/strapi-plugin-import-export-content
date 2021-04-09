import React, { useState } from "react";
import PropTypes from "prop-types";

import { Button } from "@buffetjs/core";
import { Row } from "../common";
import { TableWrapper } from "./styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function DataMapper({ data, mapper, onSuccess, onCancel }) {
  const { fieldsInfo, parsedData } = data;
  const [importItems, setImportItems] = useState(parsedData);

  console.log(mapper);

  const deleteItem = (item) => () => {
    const importItemsFiltered = importItems.filter(
      (importItems) => importItems !== item
    );
    setImportItems(importItemsFiltered);
  };

  const handleUploadItems = () => onSuccess(importItems);
  return (
    <div className="pt-3 col-12">
      <Row>
        <h2>Map the Import Data to Destination Field</h2>
        <TableWrapper>
          <table>
            <thead>
              <tr>
                {fieldsInfo.map(({ fieldName }) => (
                  <th key={fieldName}>{fieldName}</th>
                ))}
                <th>Del</th>
              </tr>
            </thead>
            <tbody>
              {importItems.map((row, i) => (
                <tr key={i}>
                  {fieldsInfo.map(({ fieldName }, j) => {
                    const cell = row[fieldName];

                    if (cell === undefined || cell === null)
                      return <td key={j}>-</td>;

                    if (typeof cell === "object")
                      return <td key={j}>{JSON.stringify(cell)}</td>;

                    return <td key={j}>{`${cell}`}</td>;
                  })}
                  <td>
                    <button onClick={deleteItem(row)}>
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrapper>
      </Row>
      <Row>
        {
          <p>
            Count of Items to Import: <strong>{importItems.length}</strong>
          </p>
        }
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

export default DataMapper;
