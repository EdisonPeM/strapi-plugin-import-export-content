import React, { memo } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function DataBody({ rows, headers, onDeleteItem, onlyFistRow }) {
  return (
    <tbody className={onlyFistRow ? "fist-row-selected" : ""}>
      {rows.map((row, i) => (
        <tr key={i}>
          {headers.map((header, j) => {
            const cell = row[header];

            if (cell === undefined || cell === null) return <td key={j}>-</td>;

            if (typeof cell === "object")
              return <td key={j}>{JSON.stringify(cell)}</td>;

            return <td key={j}>{`${cell}`}</td>;
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
