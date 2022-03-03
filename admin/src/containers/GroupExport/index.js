/*
 *
 * GroupExport
 *
 */

import React, { memo, useState, useMemo } from "react";
import PropTypes from "prop-types";

import { Row } from "../../components/common";
import { Select, Label, Button } from "@buffetjs/core";

import pluginId from "../../pluginId";
import { request, auth } from "strapi-helper-plugin";

import { Collapse } from "reactstrap";
import { FilterIcon } from "strapi-helper-plugin";
import OptionsExport from "../../components/OptionsExport";
import useExportFormats from "../../hooks/useExportFormat";
import useExportOptions from "../../hooks/useExportOptions";

function GroupExport({ contentTypes, setIsLoading }) {
  const [targets, setTargets] = useState(
    contentTypes.reduce((acc, type) => ({
      ...acc, [type.uid]: {
        enabled: true,
        label: info.label || apiID,
      }
    }), {})
  );

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

  const handleSelectExportFormat = ({ target: { value } }) => {
    setExportFormat(value);
  };

  const getContent = async () => {
    if (sourceExports === "")
      return strapi.notification.toggle({
        type: "warning",
        message: "export.source.empty",
      });

    try {
      setIsLoading(true);

      const token = auth.getToken();

      const response = await fetch(`/${pluginId}/export-multi`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          targets: contentTypes.filter(({ uid }) => !!targets[uid]),
          type: exportFormat,
          options
        },
      });

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `export.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      setContentToExport(data);
    } catch (error) {
      strapi.notification.toggle({
        type: "warning",
        message: `export.items.error`,
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      <Row>
        <div className="pt-3 col-sm-12 col-md-12">
          <Label htmlFor="exportSource">Export Source</Label>
          <ul>
            {Object.keys(targets).map(current => {
              return (
                <li key={current} style={{ padding: 15 }}>
                  <Checkbox
                    name={current}
                    message={targets[current].label}
                    value={targets[current].enabled}
                    onChange={({ target: { name, value } }) => {
                      setTargets(prevState => ({
                        ...prevState,
                        [name]: {
                          enabled: value,
                          ...targets[current]
                        },
                      }));
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </Row>
      <Row>
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
        <div className="mt-3 col-md-4">
          <Button
            onClick={getContent}
            className="w-100"
            label="Download"
            color="primary"
          />
        </div>
      </Row>
    </>
  );
}

GroupExport.defaultProps = {
  contentTypes: [],
};

GroupExport.propTypes = {
  contentTypes: PropTypes.array,
  setIsLoading: PropTypes.func,
};

export default memo(GroupExport);
