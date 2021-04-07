function formatFileContent({ content, mimeType }) {
  switch (mimeType) {
    case "application/json":
      const jsonData = JSON.parse(content);
      return JSON.stringify(jsonData, null, 2);
    case "text/csv":
    default:
      return content;
  }
}

export default formatFileContent;
