import React, { memo } from "react";
import PropTypes from "prop-types";
import { Label, Select } from "@buffetjs/core";

function DataHeader({
  headers,
  headersOptions,
  headersValues,
  onSelectHeader,
}) {
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
        <th></th>
      </tr>
      <tr>
        {headers.map((header) => (
          <th key={header}>
            <Label htmlFor={`map-${header}`}>
              <Select
                name={`map-${header}`}
                options={headersOptions}
                value={headersValues[header]}
                onChange={onSelectHeader(header)}
              />
            </Label>
          </th>
        ))}
        <th>Del</th>
      </tr>
    </thead>
  );
}

DataHeader.defaultProps = {
  headers: [],
  headersOptions: [],
  headersValues: {},
  onSelectHeader: () => {},
};

DataHeader.propTypes = {
  headers: PropTypes.array,
  headersOptions: PropTypes.array,
  headersValues: PropTypes.object,
  onSelectHeader: PropTypes.func,
};

export default memo(DataHeader);
