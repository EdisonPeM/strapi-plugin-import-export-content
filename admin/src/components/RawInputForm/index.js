import React, { useState, memo } from "react";
import PropTypes from "prop-types";

import { EditorWrapper } from "./styles";
import Editor from "react-simple-code-editor";

import { Label, Select, Button } from "@buffetjs/core";
import { Row } from "../../components/common";

import FORMATS from "../../constants/formats";
import highlight from "../../utils/highlight";

import useTrads from "../../hooks/useTrads";

const fortmatsOptions = FORMATS.map(({ name, mimeType }) => ({
  label: name,
  value: mimeType,
}));

function RawInputForm({ onSubmit }) {
  const formatMessage = useTrads();
  const [rawText, setRawText] = useState("");
  const [rawFormat, setRawFormat] = useState(FORMATS[0].mimeType || "");

  const handleSubmit = (ev) => {
    ev.preventDefault();
    onSubmit({
      data: rawText,
      type: rawFormat,
    });
  };

  return (
    <form className="col-12" onSubmit={handleSubmit}>
      <Row>
        <Label
          message={formatMessage("import.raw.format")}
          htmlFor="dataFormats"
        />
        <Select
          name="dataFormats"
          options={fortmatsOptions}
          value={rawFormat}
          onChange={({ target: { value } }) => setRawFormat(value)}
        />
      </Row>
      <Row>
        <EditorWrapper>
          <Editor
            className="editor"
            value={rawText}
            onValueChange={(value) => setRawText(value)}
            highlight={(code) => highlight(code, rawFormat)}
            padding={10}
          />
        </EditorWrapper>
      </Row>
      <Row>
        <Button
          type="submit"
          label={formatMessage("import.analyze")}
          disabled={rawText === ""}
        />
      </Row>
    </form>
  );
}

RawInputForm.defaultProps = {
  onSubmit: () => {},
};

RawInputForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default memo(RawInputForm);
