/*
 *
 * ExportPage
 *
 */

import React, { memo, useState, useMemo } from "react";
import PropTypes from "prop-types";

import { Block, Row } from "../../components/common";
import { Select, Label, Button } from "@buffetjs/core";
import DataViewer from "../../components/DataViewer";

import FORMATS from "../../constants/formats";

import pluginId from "../../pluginId";
import { request } from "strapi-helper-plugin";
import { downloadFile, copyClipboard } from "../../utils/exportUtils";

const exportFormatsOptions = FORMATS.map(({ name, mimeType }) => ({
  label: name,
  value: mimeType,
}));

function ImportPage({ contentTypes }) {
  const [target, setTarget] = useState(null);
  const [sourceExports, setSourceExports] = useState("");
  const [exportFormat, setExportFormat] = useState("application/json");
  const [contentToExport, setContentToExport] = useState("");

  const sourceOptions = useMemo(
    () =>
      [{ label: "Select Export Source", value: "" }].concat(
        contentTypes.map(({ uid, info, apiID }) => ({
          label: info.label || apiID,
          value: uid,
        }))
      ),
    [contentTypes]
  );

  // Source Options Handler
  const handleSelectSourceExports = ({ target: { value } }) => {
    setSourceExports(value);
    setTarget(contentTypes.find(({ uid }) => uid === value));
    setContentToExport("");
  };

  // Source Options Handler
  const handleSelectExportFormat = ({ target: { value } }) => {
    setExportFormat(value);
    setContentToExport("");
  };

  // Request to Get Available Content
  const getContent = async () => {
    if (sourceExports === "")
      return strapi.notification.toggle({
        type: "warning",
        message: "export.source.empty",
      });

    try {
      const { data } = await request(`/${pluginId}/export`, {
        method: "POST",
        body: { target, type: exportFormat },
      });

      setContentToExport(data);
    } catch (error) {
      strapi.notification.toggle({
        type: "warning",
        message: `export.items.error`,
      });
    }
  };

  // Export Options
  const handleDownload = () => {
    downloadFile(target.info.name, contentToExport, exportFormat);
  };
  const handleCopy = () => copyClipboard(contentToExport);

  return (
    <Block
      title="Export"
      description="Configure the Export Source & Format"
      style={{ marginBottom: 12 }}
    >
      <Row>
        <div className="pt-3 col-sm-6 col-md-5">
          <Label htmlFor="exportSource">Export Source</Label>
          <Select
            name="exportSource"
            options={sourceOptions}
            value={sourceExports}
            onChange={handleSelectSourceExports}
          />
        </div>
        <div className="pt-3 col-sm-6 col-md-5">
          <Label htmlFor="exportFormat">Export Format</Label>
          <Select
            name="exportFormat"
            options={exportFormatsOptions}
            value={exportFormat}
            onChange={handleSelectExportFormat}
          />
        </div>
        <div className="pt-3 col-md-2 d-flex flex-column-reverse">
          <Button
            onClick={getContent}
            className="w-100"
            label="Query"
            color="primary"
          />
        </div>
      </Row>
      <Row>
        <div className="col-12">
          <DataViewer data={contentToExport} type={exportFormat} />
        </div>
        <div className="mt-3 col-12">
          <Button
            label="Donwload"
            color="success"
            disabled={!contentToExport}
            onClick={handleDownload}
          />
          <Button
            className="ml-3"
            label="Copy to Clipboard"
            color="secondary"
            disabled={!contentToExport}
            onClick={handleCopy}
          />
        </div>
      </Row>
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
