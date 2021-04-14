import React, { memo } from "react";
import PropTypes from "prop-types";
import { Label, Select } from "@buffetjs/core";

// FORMATS
import {
  Bool as BoolIcon,
  Json as JsonIcon,
  Text as TextIcon,
  NumberIcon,
  Pending as HourIcon,
  Enumeration as ListIcon,
  media as MediaIcon,
  Email as EmailIcon,
  Calendar as DateIcon,
  RichText as RichTextIcon,
} from "@buffetjs/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const ICONS = {
  string: <TextIcon fill="#69BA05" />,

  // Sub Types of String
  email: <EmailIcon fill="#69BA05" />,
  text: <RichTextIcon fill="#69BA05" />,
  date: <DateIcon fill="#69BA05" />,
  hour: <HourIcon fill="#69BA05" />,
  url: <FontAwesomeIcon icon={faLink} color="#69BA05" />,
  media: <MediaIcon fill="#69BA05" />,

  // Others
  boolean: <BoolIcon fill="#69BA05" />,
  number: <NumberIcon fill="#69BA05" />,
  object: <JsonIcon fill="#69BA05" />,
  array: <ListIcon fill="#69BA05" />,
};

function DataHeader({
  headersInfo,
  headersOptions,
  headersValues,
  onSelectHeader,
}) {
  return (
    <thead>
      <tr>
        {headersInfo.map(({ fieldName, format }) => (
          <th key={fieldName}>
            <span className="mr-3">{fieldName}</span>
            <span>{ICONS[format]}</span>
          </th>
        ))}
        <th></th>
      </tr>
      <tr>
        {headersInfo.map(({ fieldName }) => (
          <th key={fieldName}>
            <Label htmlFor={`map-${fieldName}`}>
              <Select
                name={`map-${fieldName}`}
                options={headersOptions}
                value={headersValues[fieldName]}
                onChange={onSelectHeader(fieldName)}
                className={
                  headersValues[fieldName] === "none" ? "unselected" : ""
                }
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
