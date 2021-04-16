import React, { useState, memo } from "react";
import PropTypes from "prop-types";
import Editor from "react-simple-code-editor";
import { EditorWrapper } from "./styles";

import { Label, Select, Textarea, Button } from "@buffetjs/core";
import { Row } from "../../components/common";

import FORMATS from "../../constants/formats";

function RawInputForm({ onSubmit }) {
  const [rawText, setRawText] = useState("");
  const [rawFormat, setRawFormat] = useState(FORMATS[0].mimeType || "");

  // const handleRawTextArea = ({ target: { value } }) => setRawText(value);
  const handleFormatSelect = ({ target: { value } }) => setRawFormat(value);

  const handleTabOnTextArea = (ev) => {
    if ((ev.keyCode === 9 || ev.key === "Tab") && !ev.shiftKey) {
      ev.preventDefault();
      setRawText(`${rawText}  `);
    }
  };

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
        <Label message="Data Format" htmlFor="dataFormats" />
        <Select
          name="dataFormats"
          options={FORMATS.map(({ name, mimeType }) => ({
            label: name,
            value: mimeType,
          }))}
          value={rawFormat}
          onChange={handleFormatSelect}
        />
      </Row>
      <Row>
        <EditorWrapper>
          <Editor
            className="editor"
            value={rawText}
            onValueChange={(value) => setRawText(value)}
            highlight={(text) => text}
            padding={10}
          />
        </EditorWrapper>
      </Row>
      <Row>
        <Button type="submit" label={"Analyze"} />
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
