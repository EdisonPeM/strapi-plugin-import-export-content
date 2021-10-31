import React, { memo } from "react";
import PropTypes from "prop-types";

import { Label } from "@buffetjs/core";
import { SelectWarning } from "../../common";
import FormatIcon from "../../FormatIcon";

function TableHeader({ headers, headersSelectOptions, onChangeSelect }) {
  return (
    <thead>
      <tr>
        {headers.map(({ name, format }) => (
          <th key={name}>
            <span className="mr-3">{name}</span>
            <span title={`${format} format`}>
              <FormatIcon format={format} />
            </span>
          </th>
        ))}
        <th></th>
      </tr>
      <tr>
        {headers.map(({ name, value }) => (
          <th key={name}>
            <Label htmlFor={`map-${name}`}>
              <SelectWarning
                name={`map-${name}`}
                value={value}
                options={headersSelectOptions}
                onChange={onChangeSelect(name)}
                valueWarning="none"
                showWarning
              />
            </Label>
          </th>
        ))}
        <th>Del</th>
      </tr>
    </thead>
  );
}

TableHeader.defaultProps = {
  headers: [],
  headersSelectOptions: [],
  onChangeSelect: () => {},
};

TableHeader.propTypes = {
  headers: PropTypes.array,
  headersSelectOptions: PropTypes.array,
  onChangeSelect: PropTypes.func,
};

export default memo(TableHeader);
