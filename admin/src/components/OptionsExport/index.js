import React from "react";
import { Select, Checkbox } from "@buffetjs/core";

import BASE_OPTIONS from "../../constants/options";

import { useGlobalContext } from "strapi-helper-plugin";
import getTrad from '../../utils/getTrad';

function OptionsExport({ values, onChange }) {
  const { formatMessage } = useGlobalContext();

  return (
    <div>
      <hr />
      {BASE_OPTIONS.map(({ name, label, type, optionalValues }) => {

        const handleChange = ({ target: { value } }) => onChange(name, value);

        if (type === "select") {
          return (
            <div className="mt-3">
              <span>{formatMessage({ id: getTrad(label)})}:</span>
              <Select
                key={name}
                name={name}
                value={values[name]}
                onChange={handleChange}
                options={optionalValues}
              />
            </div>
          );
        } else if (type === "boolean") {
          return (
            <div className="mt-3">
              <Checkbox
                key={name}
                message={formatMessage({ id: getTrad(label)})}
                name={name}
                value={values[name]}
                onChange={handleChange}
              />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}

export default OptionsExport;
