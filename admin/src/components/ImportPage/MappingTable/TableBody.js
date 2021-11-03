import React, { memo } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons/faTrashAlt";

import MediaPreview from "../MediaPreview";
import { isUrlMedia } from "../../../utils/mediaFormat";

function TableBody({ rows, headers, onDeleteItem, onlyFistRow }) {
  return (
    <tbody className={onlyFistRow ? "fist-row-selected" : ""}>
      {rows.map((row, i) => (
        <tr key={i}>
          {headers.map((name, j) => {
            const cell = row[name];

            if (cell === undefined || cell === null) return <td key={j}>-</td>;
            if (Array.isArray(cell)) {
              return (
                <td key={j} title={JSON.stringify(cell, null, 2)}>
                  {cell.map((cellItem, k) => {
                    if (typeof cellItem === "object")
                      return (
                        <div key={k} className="m-2">{`${JSON.stringify(
                          cellItem
                        )}`}</div>
                      );

                    if (typeof cellItem === "string" && isUrlMedia(cellItem))
                      return (
                        <div key={k} className="border p-1 m-2">
                          <MediaPreview url={cellItem} height={25} />
                        </div>
                      );

                    return <div key={k} className="m-2">{`${cellItem}`}</div>;
                  })}
                </td>
              );
            }

            if (typeof cell === "object")
              return (
                <td key={j} title={JSON.stringify(cell, null, 2)}>
                  {JSON.stringify(cell)}
                </td>
              );

            if (typeof cell === "string" && isUrlMedia(cell))
              return (
                <td key={j} title={cell}>
                  <div className="media justify-content-center">
                    <div className="border p-1">
                      <MediaPreview url={cell} height={25} />
                    </div>
                  </div>
                </td>
              );

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

TableBody.defaultProps = {
  rows: [],
  headers: [],
  onDeleteItem: () => {},
  onlyFistRow: false,
};

TableBody.propTypes = {
  rows: PropTypes.array,
  headers: PropTypes.array,
  onDeleteItem: PropTypes.func,
  onlyFistRow: PropTypes.bool,
};

export default memo(TableBody);
