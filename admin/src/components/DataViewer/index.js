import React from "react";
import PropTypes from "prop-types";
import { Code } from "./styles";

import formatFileContent from "../../utils/formatFileContent";

function DataViewer({ data, type }) {
  const content = formatFileContent({
    content: data,
    mimeType: type,
  });

  return <Code>{content}</Code>;
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
