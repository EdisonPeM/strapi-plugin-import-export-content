import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import { Prompt } from "react-router-dom";

import { Button } from "@buffetjs/core";
import { Row } from "../../common";
import DropFileZone from "../DropFileZone";
import DataViewer from "../../DataViewer";

import useTrads from "../../../hooks/useTrads";
import readFileContent from "../../../utils/readFileContent";
import FORMATS from "../../../constants/formats";
import { warningNotify } from "../../../utils/notifications";

function UploadFileForm({ onSubmit }) {
  const t = useTrads();
  const [file, setFile] = useState(null);
  const [data, setData] = useState("");

  const handleFileUpload = async (file) => {
    try {
      const content = await readFileContent(file);
      setData(content);
      setFile(file);
    } catch (err) {
      warningNotify(t("import.file.content.error"));
    }
  };

  const removeFile = () => {
    setData(null);
    setFile(null);
  };

  // Form Controls
  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit({ data, type: file.type });
  };

  return (
    <form className="col-12" onSubmit={handleSubmit}>
      {data !== "" && <Prompt message={t("import.source.unsaved")} />}
      <Row>
        {file ? (
          <DataViewer data={data} type={file.type} />
        ) : (
          <DropFileZone
            acceptMimeTypes={FORMATS.map(({ mimeType }) => mimeType)}
            acceptFilesTypes={FORMATS.map(({ ext }) => ext)}
            onUploadFile={handleFileUpload}
            onUploadError={() => warningNotify(t("import.file.type.error"))}
          />
        )}
      </Row>
      <Row>
        <Button
          type="submit"
          label={t("import.analyze")}
          color={file ? "primary" : "cancel"}
          disabled={!file}
        />
        <Button
          className="ml-3"
          label={t("import.file.remove")}
          color="delete"
          onClick={removeFile}
          disabled={!file}
        />
      </Row>
    </form>
  );
}

UploadFileForm.defaultProps = {
  onSubmit: () => {},
};

UploadFileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default memo(UploadFileForm);
