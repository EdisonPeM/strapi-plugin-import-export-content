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

import { request, useGlobalContext } from "strapi-helper-plugin";
import pluginId from "../../pluginId";

import getTrad from '../../utils/getTrad';

function ImportPage({ contentTypes }) {
  const { formatMessage } = useGlobalContext();

  const importSourcesOptions = [
    { label: formatMessage({ id: getTrad('import.page.select.importSource.upload')}), value: "upload" },
    { label: formatMessage({ id: getTrad('import.page.select.importSource.raw')}), value: "raw" },
  ];

  // Import Source and Import Destination States
  const [importSource, setImportSource] = useState("upload");
  const [importDest, setImportDest] = useState("");
  const importDestOptions = useMemo(
    () =>
      [{ label: formatMessage({ id: getTrad('import.page.select.importDestination')}), value: "" }].concat(
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
        message: formatMessage({ id: getTrad("import.destination.empty")})
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
        message: formatMessage({ id: getTrad("import.analyze.success")})
      });
    } catch (error) {
      console.error(error);
      strapi.notification.toggle({
        type: "warning",
        message: formatMessage({ id: getTrad("import.analyze.error")})
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
      title={formatMessage({ id: getTrad('import.page.title')})}
      description={formatMessage({ id: getTrad('import.page.description')})}
      style={{ marginBottom: 12 }}
    >
      {analysis === null ? (
        <>
          {isLoading && <Loader />}
          <Row>
            <div className="pt-3 col-sm-6">
              <Label htmlFor="importSource">{formatMessage({ id: getTrad('import.page.label.source')})}</Label>
              <Select
                name="importSource"
                value={importSource}
                options={importSourcesOptions}
                onChange={({ target: { value } }) => setImportSource(value)}
              />
            </div>
            <div className="pt-3 col-sm-6">
              <Label htmlFor="importDest">{formatMessage({ id: getTrad('import.page.label.destination')})}</Label>
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
