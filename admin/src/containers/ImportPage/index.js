/*
 *
 * ImportPage
 *
 */

import React, { memo, useState, useMemo } from "react";
import PropTypes from "prop-types";
import UploadFileForm from "../../components/UploadFileForm";
import RawInputForm from "../../components/RawInputForm";
import DataMapper from "../../components/DataMapper";

import { Block, Row } from "../../components/common";
import { Select, Label } from "@buffetjs/core";

import { request } from "strapi-helper-plugin";
import pluginId from "../../pluginId";

const importSourcesOptions = [
  { label: "Upload file", value: "upload" },
  { label: "Raw text", value: "raw" },
];

function ImportPage({ contentTypes }) {
  const [sourceImports, setSourceImports] = useState("upload");
  const [importDest, setImportDest] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [mapper, setMapper] = useState(null);

  // Source Options Handler
  const handleSelectSouceImports = ({ target: { value } }) => {
    setSourceImports(value);
  };

  // Destination Options
  const destinationOptions = useMemo(
    () =>
      [{ label: "Select Import Destination", value: "" }].concat(
        contentTypes.map(({ uid, info, apiID }) => ({
          label: info.label || apiID,
          value: uid,
        }))
      ),
    [contentTypes]
  );

  // Destination Options Handler
  const handleSelectImportDestination = ({ target: { value } }) => {
    setImportDest(value);
  };

  // Send Data to analyze
  const analizeImports = async (body) => {
    // Prevent Empty Destination
    if (importDest === "")
      return strapi.notification.toggle({
        type: "warning",
        message: "import.destination.empty",
      });

    // Send Request
    try {
      const response = await request(`/${pluginId}/pre-analyze`, {
        method: "POST",
        body,
      });

      // Set Content Type Data to map
      setMapper(contentTypes.find(({ uid }) => uid === importDest));
      setAnalysis(response);

      // Notifications
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

  // Upload Data
  const uploadData = async ({ target, fields, items }) => {
    // Finish with the import
    endImport();

    // Prevent Upload Empty Data;
    if (items.length === 0) {
      strapi.notification.toggle({
        type: "warning",
        message: "import.items.empty",
      });
    }

    try {
      // Send Request
      const response = await request(`/${pluginId}/import`, {
        method: "POST",
        body: { target, fields, items },
      });

      console.log(response);

      strapi.notification.toggle({
        type: "success",
        message: `import.items.succesfully`,
      });
    } catch (error) {
      strapi.notification.toggle({
        type: "warning",
        message: `import.items.error`,
      });
    }
  };

  // Reset analysis and mapper
  const endImport = () => {
    setMapper(null);
    setAnalysis(null);
  };

  return (
    <Block
      title="General"
      description="Configure the Import Source & Destination"
      style={{ marginBottom: 12 }}
    >
      {analysis === null ? (
        <>
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
            <div className="pt-3 col-sm-6">
              <Label htmlFor="importDest">Import Destination</Label>
              <Select
                name="importDest"
                options={destinationOptions}
                value={importDest}
                onChange={handleSelectImportDestination}
              />
            </div>
          </Row>
          {sourceImports === "upload" ? (
            <UploadFileForm onSubmit={analizeImports} />
          ) : (
            <RawInputForm onSubmit={analizeImports} />
          )}
        </>
      ) : (
        <DataMapper
          data={analysis}
          mapper={mapper}
          onSuccess={uploadData}
          onCancel={endImport}
        />
      )}
    </Block>
  );
}

ImportPage.defaultProps = {
  contentTypes: [],
};

ImportPage.propTypes = {
  contentTypes: PropTypes.array,
};

export default memo(ImportPage);
