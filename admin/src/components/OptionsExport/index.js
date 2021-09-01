import React from "react";
import { Select, Checkbox } from "@buffetjs/core";

import BASE_OPTIONS from "../../constants/options";
import useTrads from "../../hooks/useTrads";

function OptionsExport({ values, onChange }) {
  const formatMessage = useTrads();
  return (
    <div>
      <hr />
      {BASE_OPTIONS.map(({ name, type, optionalValues }) => {
        const handleChange = ({ target: { value } }) => onChange(name, value);

        if (type === "select") {
          return (
            <div key={name} className="mt-3">
              <span>{formatMessage(`export.options.${name}`)}:</span>
              <Select
                name={name}
                value={values[name]}
                onChange={handleChange}
                options={optionalValues}
              />
            </div>
          );
        } else if (type === "boolean") {
          return (
            <div key={name} className="mt-3">
              <Checkbox
                message={formatMessage(`export.options.${name}`)}
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
