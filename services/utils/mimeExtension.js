function mimeExtension() {
  switch (type) {
    case "text/csv":
    case "application/vnd.ms-excel": {
      return 'csv';
    }
    case "application/json": {
      return '.json'
    }
  }
}

export default mimeExtension;