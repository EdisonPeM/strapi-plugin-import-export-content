function formatFileContent({ content, mimeType }) {
  switch (mimeType) {
    case "application/json":
      try {
        const jsonData = JSON.parse(content);
        return JSON.stringify(jsonData, null, 2);
      } catch (error) {
        return "";
      }

    case "text/csv":
    default:
      return content;
  }
}

export default formatFileContent;
