function mimeExtension(type) {
  switch (type) {
    case "text/csv":
    case "application/vnd.ms-excel": {
      return 'csv';
    }
    case "application/json": {
      return 'json'
    }
  }
}

module.exports = mimeExtension;