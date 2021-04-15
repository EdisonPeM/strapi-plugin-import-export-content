import React, { memo } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";

import MediaPreview from "../MediaPreview";
function DataBody({ rows, headersInfo, onDeleteItem, onlyFistRow }) {
  return (
    <tbody className={onlyFistRow ? "fist-row-selected" : ""}>
      {rows.map((row, i) => (
        <tr key={i}>
          {headersInfo.map((header, j) => {
            const cell = row[header.fieldName];

            if (cell === undefined || cell === null) return <td key={j}>-</td>;
            if (typeof cell === "object")
              return (
                <td key={j} title={JSON.stringify(cell, null, 2)}>
                  {JSON.stringify(cell)}
                </td>
              );

            if (header.format === "media") {
              return (
                <td key={j} title={cell}>
                  <div className="media justify-content-center">
                    <div className="border p-1">
                      <MediaPreview url={cell} height={25} />
                    </div>
                  </div>
                </td>
              );
            }

            return <td key={j} title={`${cell}`}>{`${cell}`}</td>;
          })}
          <td>
            <button onClick={onDeleteItem(row)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

DataBody.defaultProps = {
  rows: [],
  headers: [],
  onDeleteItem: () => {},
  onlyFistRow: false,
};

DataBody.propTypes = {
  rows: PropTypes.array,
  headers: PropTypes.array,
  onDeleteItem: PropTypes.func,
  onlyFistRow: PropTypes.bool,
};

export default memo(DataBody);
