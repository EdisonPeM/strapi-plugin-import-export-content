/*
 *
 * ImportPage
 *
 */

import React, { memo, useState, useMemo } from "react";
import PropTypes from "prop-types";
import UploadFileForm from "../../components/UploadFileForm";
import RawInputForm from "../../components/RawInputForm";
import DataMapper from "../DataMapper";

import { Loader, Block, Row } from "../../components/common";
import { Select, Label } from "@buffetjs/core";

import { request } from "strapi-helper-plugin";
import pluginId from "../../pluginId";
import useTrads from "../../hooks/useTrads";

function ImportPage({ contentTypes }) {
  const format = useTrads();

  // Import Source and Import Destination States
  const [importSource, setImportSource] = useState("upload");
  const importSourcesOptions = useMemo(
    () => [
      { label: format("import.source.upload"), value: "upload" },
      { label: format("import.source.raw"), value: "raw" },
    ],
    []
  );

  const [importDest, setImportDest] = useState("");
  const importDestOptions = useMemo(
    () =>
      [{ label: "Select Destination", value: "" }].concat(
        contentTypes.map(({ uid, info, apiID }) => ({
          label: info.label || apiID,
          value: uid,
        }))
      ),
    [contentTypes]
  );

  // Analysis
  const [analysis, setAnalysis] = useState(null);
  const [target, setTarget] = useState(null);
  const [isLoading, setIsLoadig] = useState(false);
  const analizeImports = async ({ data, type }) => {
    // Prevent Empty Destination
    if (importDest === "")
      return strapi.notification.toggle({
        type: "warning",
        message: format("import.destination.empty"),
      });

    // Send Request
    try {
      setIsLoadig(true);
      const response = await request(`/${pluginId}/pre-analyze`, {
        method: "POST",
        body: { data, type },
      });

      // Set Content Type Data to map
      setTarget(contentTypes.find(({ uid }) => uid === importDest));
      setAnalysis(response.data);

      // Notifications
      strapi.notification.toggle({
        type: "success",
        message: format("import.analyze.success"),
      });
    } catch (error) {
      console.error(error);
      strapi.notification.toggle({
        type: "warning",
        message: format("import.analyze.error"),
      });
    }

    setIsLoadig(false);
  };

  // Reset analysis and target
  const endImport = () => {
    setAnalysis(null);
    setTarget(null);
  };

  return (
    <Block
      title={format("import.title")}
      description={format("import.description")}
      style={{ marginBottom: 12 }}
    >
      {analysis === null ? (
        <>
          {isLoading && <Loader />}
          <Row>
            <div className="pt-3 col-sm-6">
              <Label htmlFor="importSource">{format("import.source")}</Label>
              <Select
                name="importSource"
                value={importSource}
                options={importSourcesOptions}
                onChange={({ target: { value } }) => setImportSource(value)}
              />
            </div>
            <div className="pt-3 col-sm-6">
              <Label htmlFor="importDest">{format("import.destination")}</Label>
              <Select
                name="importDest"
                value={importDest}
                options={importDestOptions}
                onChange={({ target: { value } }) => setImportDest(value)}
              />
            </div>
          </Row>
          {importSource === "upload" ? (
            <UploadFileForm onSubmit={analizeImports} />
          ) : (
            <RawInputForm onSubmit={analizeImports} />
          )}
        </>
      ) : (
        <DataMapper analysis={analysis} target={target} onImport={endImport} />
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
