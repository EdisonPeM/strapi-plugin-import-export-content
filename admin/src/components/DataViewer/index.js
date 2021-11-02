import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Code } from "./styles";

import formatFileContent from "../../utils/formatFileContent";
import highlight from "../../utils/highlight";
import { Loader } from "../common";

function DataViewer({ data, type }) {
  const [innerHTML, setInnerHTML] = useState("");

  useEffect(() => {
    if (!data) return;
    setTimeout(() => {
      const content = formatFileContent({
        content: data,
        mimeType: type,
      });

      const __html = highlight(content, type);
      setInnerHTML(__html);

      // Set time to show the loader
    }, 50);
  }, [data, type]);

  return (
    <Code>
      {!innerHTML && <Loader />}
      <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
    </Code>
  );
}

DataViewer.defaultProps = {
  data: "",
  type: "",
};

DataViewer.propTypes = {
  data: PropTypes.string,
  type: PropTypes.string,
};

export default DataViewer;
