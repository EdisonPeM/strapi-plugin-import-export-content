import React, { useState } from "react";
import { useGlobalContext } from "strapi-helper-plugin";

function ImportForm() {
  const { formatMessage } = useGlobalContext();

  const contentTypes = [];

  const [contentTypeSelected, setContentType] = useState("");
  const handleSelectContentType = ({ target: { value } }) => {
    setContentType(value);
  };

  return (
    <div className="pt-3 col-sm">
      <Label htmlFor="contentType">{formatMessage({ id: getTrad('import.page.label.destination')})}</Label>
      <Select
        name="contentType"
        options={[{ label: formatMessage({ id: getTrad('import.page.option.contentType')}), value: "" }].concat(
          contentTypes.map(({ info, uid }) => ({
            label: info.label,
            value: uid,
          }))
        )}
        value={contentTypeSelected}
        onChange={handleSelectContentType}
      />
    </div>
  );
}

export default ImportForm;
