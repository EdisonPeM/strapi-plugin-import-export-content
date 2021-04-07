/*
 *
 * HomePage
 *
 */

import React, { memo, useState } from "react";
// import PropTypes from "prop-types";
import UploadFileForm from "../../components/UploadFileForm";
import RawInputForm from "../../components/RawInputForm";

import { Block, Row } from "../../components/common";
import { Select, Label } from "@buffetjs/core";

import { request } from "strapi-helper-plugin";
import pluginId from "../../pluginId";

const importSourcesOptions = [
  { label: "Upload file", value: "upload" },
  { label: "Raw text", value: "raw" },
];

function ImportPage() {
  const [sourceImports, setSourceImports] = useState("upload");
  const handleSelectSouceImports = ({ target: { value } }) => {
    setSourceImports(value);
  };

  const analizeImports = async (body) => {
    try {
      const response = await request(`/${pluginId}/pre-analyze`, {
        method: "POST",
        body,
      });

      console.log(response);
      strapi.notification.toggle({
        type: "success",
        message: "import.analyze.success",
      });
    } catch (error) {
      console.error(error);
      strapi.notification.toggle({
        type: "warning",
        message: "import.analyze.error",
      });
    }
  };

  return (
    <Block
      title="General"
      description="Configure the Import Source & Destination"
      style={{ marginBottom: 12 }}
    >
      <Row>
        <div className="pt-3 col-sm-6">
          <Label htmlFor="importSource">Import Source</Label>
          <Select
            name="importSource"
            options={importSourcesOptions}
            value={sourceImports}
            onChange={handleSelectSouceImports}
          />
        </div>
      </Row>
      {sourceImports === "upload" ? (
        <UploadFileForm onSubmit={analizeImports} />
      ) : (
        <RawInputForm onSubmit={analizeImports} />
      )}
    </Block>
  );
}

export default memo(ImportPage);
