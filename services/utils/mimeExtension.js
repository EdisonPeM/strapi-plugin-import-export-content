function mimeExtension() {
  switch (type) {
    case "text/csv":
    case "application/vnd.ms-excel": {
      const mappedItems = toArray(items);
      const headers = getFieldsFromItems(mappedItems);
      const data = mappedItems
        .map((item) => jsonToCsv(item, headers))
        .join("\n");

      return 'csv';
    }
    case "application/json": {
      return '.json'
    }
  }
}

export default mimeExtension;