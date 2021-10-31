import React, { useState } from "react";
import PropTypes from "prop-types";

import DragAndDropIcon from "./DragAndDropIcon";
import { Label, P } from "./styles";

function DropFileZone({
  acceptMimeTypes,
  acceptFilesTypes,
  onUploadFile,
  onUploadError,
}) {
  const validateFile = (file) => {
    if (acceptMimeTypes.includes(file.type)) {
      onUploadFile(file);
    } else {
      onUploadError();
    }
  };

  const handleFileChange = ({ target: { files } }) => validateFile(files[0]);

  const [isDragging, setIsDragging] = useState(false);
  const handleDragEnter = () => setIsDragging(true);
  const handleDragLeave = () => setIsDragging(false);
  const stopDragEvent = (ev) => ev.preventDefault() && ev.stopPropagation();
  const handleDrop = (ev) => {
    ev.preventDefault();
    setIsDragging(false);

    const { files } = ev.dataTransfer;
    validateFile(files[0]);
  };

  return (
    <Label
      isDragging={isDragging}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragOver={stopDragEvent}
    >
      <DragAndDropIcon />
      <P>
        <span>
          Drag & drop your file into this area or{" "}
          <span className={"underline"}>browse</span> for a file to upload
        </span>
      </P>
      {isDragging && (
        <div onDragLeave={handleDragLeave} className="isDragging" />
      )}
      <input
        onChange={handleFileChange}
        type="file"
        accept={acceptFilesTypes.join()}
        hidden
      />
    </Label>
  );
}

DropFileZone.defaultProps = {
  acceptMimeTypes: [],
  acceptFilesTypes: [],
  onUploadFile: () => {},
  onUploadError: () => {},
};

DropFileZone.propTypes = {
  acceptMimeTypes: PropTypes.array,
  acceptFilesTypes: PropTypes.array,
  onUploadFile: PropTypes.func,
  onUploadError: PropTypes.func,
};

export default DropFileZone;
