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

import pluginId from "../../pluginId";
import { request } from "strapi-helper-plugin";
import { downloadFile, copyClipboard } from "../../utils/exportUtils";

import { Collapse } from "reactstrap";
import { FilterIcon } from "strapi-helper-plugin";
import BASE_OPTIONS from "../../constants/options";
import OptionsExport from "../../components/OptionsExport";
import useExportFormats from "../../hooks/useExportFormat";
import useExportOptions from "../../hooks/useExportOptions";

function ImportPage({ contentTypes }) {
  const [target, setTarget] = useState(null);

  const {
    exportFormat,
    setExportFormat,
    exportFormatsOptions,
  } = useExportFormats();

  const {
    options,
    isOptionsOpen,
    setIsOptionsOpen,
    updateOption,
  } = useExportOptions();

  const [sourceExports, setSourceExports] = useState("");
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
    downloadFile(target.info.name, contentToExport, exportFormat);
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
            icon={<FilterIcon />}
            label="Options"
            color="cancel"
          />
        </div>
      </Row>
      <Row>
        <div className="col-12">
          <Collapse isOpen={isOptionsOpen}>
            <OptionsExport values={options} onChange={updateOption} />
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

ImportPage.defaultProps = {
  contentTypes: [],
};

ImportPage.propTypes = {
  contentTypes: PropTypes.array,
};

export default memo(ImportPage);
