/*
 *
 * HomePage
 *
 */

import React, { memo, useState } from "react";
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

  const handleSelectSouceImports = ({ target: { value } }) => {
    setSourceImports(value);
  };

  const handleSelectImportDestination = ({ target: { value } }) => {
    setImportDest(value);
  };

  const analizeImports = async (body) => {
    // if (importDest === "")
    //   return strapi.notification.toggle({
    //     type: "warning",
    //     message: "import.destination.empty",
    //   });

    try {
      const response = await request(`/${pluginId}/pre-analyze`, {
        method: "POST",
        body,
      });

      setMapper(contentTypes.find(({ uid }) => uid === importDest));
      setAnalysis(response);

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

  const uploadData = (dataToUpload) => {
    console.log(dataToUpload);
    if (dataToUpload.length === 0) {
      strapi.notification.toggle({
        type: "warning",
        message: "import.items.empty",
      });
    }

    setMapper(null);
    setAnalysis(null);
  };

  const cancelUpload = () => {
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
                options={[
                  { label: "Select Import Destination", value: "" },
                ].concat(
                  contentTypes.map(({ uid, info, apiID }) => ({
                    label: info.label || apiID,
                    value: uid,
                  }))
                )}
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
          onCancel={cancelUpload}
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
