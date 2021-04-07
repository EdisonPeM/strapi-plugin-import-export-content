import React, { useState } from "react";

function ImportForm() {
  const contentTypes = [];

  const [contentTypeSelected, setContentType] = useState("");
  const handleSelectContentType = ({ target: { value } }) => {
    setContentType(value);
  };

  return (
    <div className="pt-3 col-sm">
      <Label htmlFor="contentType">Import Destination</Label>
      <Select
        name="contentType"
        options={[{ label: "Select Content Type", value: "" }].concat(
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
