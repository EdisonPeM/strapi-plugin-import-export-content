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
import { request, useGlobalContext } from "strapi-helper-plugin";
import { downloadFile, copyClipboard } from "../../utils/exportUtils";

import { Collapse } from "reactstrap";
import { FilterIcon } from "strapi-helper-plugin";
import BASE_OPTIONS from "../../constants/options";
import OptionsExport from "../../components/OptionsExport";

import getTrad from '../../utils/getTrad';

const exportFormatsOptions = FORMATS.map(({ name, mimeType }) => ({
  label: name,
  value: mimeType,
}));

function ExportPage({ contentTypes }) {
  const { formatMessage } = useGlobalContext();

  const [target, setTarget] = useState(null);
  const [sourceExports, setSourceExports] = useState("");
  const [exportFormat, setExportFormat] = useState("application/json");
  const [contentToExport, setContentToExport] = useState("");

  const sourceOptions = useMemo(
    () =>
      [{ label: formatMessage({ id: getTrad('export.source.select')}), value: "" }].concat(
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
        message: formatMessage({ id: getTrad("export.source.empty")})
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
        message: formatMessage({ id: getTrad("export.items.error")})
      });
    }

    setIsLoadig(false);
  };

  // Export Options
  const handleDownload = () => {
    downloadFile(target.info.name, contentToExport, exportFormat);
  };
  const handleCopy = () => copyClipboard(contentToExport).then(message => {    
    if(message) strapi.notification.toggle({
      type: message.type,
      message: formatMessage({ id: getTrad(message.id)}),
    });
  })

  return (
    <Block
      title={formatMessage({ id: getTrad('export.page.title')})}
      description={formatMessage({ id: getTrad('export.page.description')})}
      style={{ marginBottom: 12 }}
    >
      {isLoading && <Loader />}
      <Row>
        <div className="pt-3 col-sm-6 col-md-5">
          <Label htmlFor="exportSource">{formatMessage({ id: getTrad('export.page.label.source')})}</Label>
          <Select
            name="exportSource"
            options={sourceOptions}
            value={sourceExports}
            onChange={handleSelectSourceExports}
          />
        </div>
        <div className="pt-3 col-sm-6 col-md-5">
          <Label htmlFor="exportFormat">{formatMessage({ id: getTrad('export.page.label.format')})}</Label>
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
            label={formatMessage({ id: getTrad('export.button.options')})}
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
            label={formatMessage({ id: getTrad('export.button.getData')})}
            color="primary"
          />
        </div>
        <div className="mt-3 col-md-3 col-lg-2">
          <Button
            label={formatMessage({ id: getTrad('export.button.download')})}
            className="w-100"
            color="success"
            disabled={!contentToExport}
            onClick={handleDownload}
          />
        </div>
        <div className="mt-3  col-md-3 col-lg-2">
          <Button
            className="w-100"
            label={formatMessage({ id: getTrad('export.button.copy')})}
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
