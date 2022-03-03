/*
 *
 * ExportPage
 *
 */
import React, { memo, useState } from "react";
import PropTypes from "prop-types";

import { Loader, Block, Row } from "../../components/common";
import { Select, Label } from "@buffetjs/core";

import SingleExport from "../SingleExport";
import GroupExport from "../GroupExport";

function ExportPage({ contentTypes }) {
  const [isLoading, setIsLoading] = useState(false);
  const [exportType, setExportType] = useState("single");

  const handleSelectExportType = ({ target: { value } }) => setExportType(value);

  return (
    <Block
      title="Export"
      description="Configure the Export Source & Format"
      style={{ marginBottom: 12 }}
    >
      {isLoading && <Loader />}

      <Row>
        <div className="pt-3 col-sm-6 col-md-5">
          <Label htmlFor="exportSource">Export Type</Label>
          <Select
            name="exportSource"
            options={[
              { label: "Single", value: 'single' },
              { label: "Group", value: 'group' },
            ]}
            value={exportType}
            onChange={handleSelectExportType}
          />
        </div>
      </Row>

      {exportType === 'single' && (
        <SingleExport contentTypes={contentTypes} setIsLoading={setIsLoading} />
      )}
      {exportType === 'group' && (
        <GroupExport contentTypes={contentTypes} setIsLoading={setIsLoading} />
      )}
    </Block>
  )
}

ExportPage.defaultProps = {
  contentTypes: [],
};

ExportPage.propTypes = {
  contentTypes: PropTypes.array,
};

export default memo(ExportPage);
