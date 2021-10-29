import React, { useState, memo } from "react";
import PropTypes from "prop-types";

import DropFileZone from "../DropFileZone";
import DataViewer from "../DataViewer";

import { Button } from "@buffetjs/core";
import { Row } from "../common";

import FORMATS from "../../constants/formats";

import readFileContent from "../../utils/readFileContent";

import { useGlobalContext } from "strapi-helper-plugin";
import getTrad from '../../utils/getTrad';

function UploadFileForm({ onSubmit }) {
  const { formatMessage } = useGlobalContext();
  
  const [file, setFile] = useState(null);
  const [data, setData] = useState("");

  const handleFileUpload = async (file) => {
    try {
      const content = await readFileContent(file);
      setData(content);
      setFile(file);
    } catch (err) {
      strapi.notification.toggle({
        type: "warning",
        message: formatMessage({ id: getTrad("import.file.content.error")})
      });
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
      <Row>
        {file ? (
          <DataViewer data={data} type={file.type} />
        ) : (
          <DropFileZone
            acceptMimeTypes={FORMATS.map(({ mimeType }) => mimeType)}
            acceptFilesTypes={FORMATS.map(({ ext }) => ext)}
            onUploadFile={handleFileUpload}
            onUploadError={() =>
              strapi.notification.toggle({
                type: "warning",
                message: formatMessage({ id: getTrad("import.file.type.error")})
              })
            }
          />
        )}
      </Row>
      <Row>
        <Button
          type="submit"
          label={formatMessage({ id: getTrad('import.upload.button.analyze')})}
          color={file ? "primary" : "cancel"}
          disabled={!file}
        />
        <Button
          className="ml-3"
          label={formatMessage({ id: getTrad('import.upload.button.remove')})}
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
