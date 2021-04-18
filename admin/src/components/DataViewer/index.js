import React from "react";
import PropTypes from "prop-types";
import { Code } from "./styles";

import formatFileContent from "../../utils/formatFileContent";
import highlight from "../../utils/highlight";

function DataViewer({ data, type }) {
  const content = formatFileContent({
    content: data,
    mimeType: type,
  });

  const __html = highlight(content, type);
  return (
    <Code>
      <div dangerouslySetInnerHTML={{ __html }} />
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
