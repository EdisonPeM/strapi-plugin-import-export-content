/*
 *
 * ExportPage
 *
 */

import React, { memo, useState, useMemo } from "react";
import PropTypes from "prop-types";

import { Loader, Block, Row } from "../../components/common";
import { Select, Label, Button } from "@buffetjs/core";
import DataViewer from "../../components/DataViewer";

import FORMATS from "../../constants/formats";

import pluginId from "../../pluginId";
import { request } from "@strapi/helper-plugin";
import { downloadFile, copyClipboard } from "../../utils/exportUtils";

import { Collapse } from "reactstrap";
import BASE_OPTIONS from "../../constants/options";
import OptionsExport from "../../components/OptionsExport";

const exportFormatsOptions = FORMATS.map(({ name, mimeType }) => ({
  label: name,
  value: mimeType,
}));

function ExportPage({ contentTypes }) {
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

  // Options to exporting
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [options, setOptions] = useState(
    BASE_OPTIONS.reduce((acc, { name, defaultValue }) => {
      acc[name] = defaultValue;
      return acc;
    }, {})
  );

  const handleChangeOptions = (option, value) => {
    setOptions({
      ...options,
      [option]: value,
    });
  };

  // Request to Get Available Content
  const [isLoading, setIsLoadig] = useState(false);
  const getContent = async () => {
    if (sourceExports === "")
      return strapi.notification.toggle({
        type: "warning",
        message: "export.source.empty",
      });

    try {
      setIsLoadig(true);
      const { data } = await request(`/${pluginId}/export`, {
        method: "POST",
        body: { target, type: exportFormat, options },
      });

      setContentToExport(data);
    } catch (error) {
      strapi.notification.toggle({
        type: "warning",
        message: `export.items.error`,
      });
    }

    setIsLoadig(false);
  };

  // Export Options
  const handleDownload = () => {
    downloadFile(target.apiID, contentToExport, exportFormat);
  };
  const handleCopy = () => copyClipboard(contentToExport);

  return (
    <Block
      title="Export"
      description="Configure the Export Source & Format"
      style={{ marginBottom: 12 }}
    >
      {isLoading && <Loader />}
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
            onClick={() => setIsOptionsOpen((v) => !v)}
            className="w-100"
            label="Options"
            color="cancel"
          />
        </div>
      </Row>
      <Row>
        <div className="col-12">
          <Collapse isOpen={isOptionsOpen}>
            <OptionsExport values={options} onChange={handleChangeOptions} />
          </Collapse>
        </div>
      </Row>
      <Row>
        <div className="col-12">
          <DataViewer data={contentToExport} type={exportFormat} />
        </div>
        <div className="mt-3 col-md-4">
          <Button
            onClick={getContent}
            className="w-100"
            label="Get Data"
            color="primary"
          />
        </div>
        <div className="mt-3 col-md-3 col-lg-2">
          <Button
            label="Download"
            className="w-100"
            color="success"
            disabled={!contentToExport}
            onClick={handleDownload}
          />
        </div>
        <div className="mt-3  col-md-3 col-lg-2">
          <Button
            className="w-100"
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

ExportPage.defaultProps = {
  contentTypes: [],
};

ExportPage.propTypes = {
  contentTypes: PropTypes.array,
};

export default memo(ExportPage);
