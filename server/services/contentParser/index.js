const { csvToJson, jsonToCsv } = require("./csvParser");
const { getFieldsFromItems } = require("../utils/fieldUtils");

const functions = () => {
  const toArray = (arr) => (Array.isArray(arr) ? arr : [arr]);

  return {
    getItemsFromContent: ({ data, type }) => {
      switch (type) {
        case "text/csv":
        case "application/vnd.ms-excel": {
          return csvToJson(data);
        }
  
        case "application/json":
        default: {
          return toArray(JSON.parse(data));
        }
      }
    },
  
    getContentFromItems: ({ items, type }) => {
      switch (type) {
        case "text/csv":
        case "application/vnd.ms-excel": {
          const mappedItems = toArray(items);
          const headers = getFieldsFromItems(mappedItems);
          const data = mappedItems
            .map((item) => jsonToCsv(item, headers))
            .join("\n");
  
          return `${headers.join()}\n${data}`;
        }
  
        case "application/json":
        default:
          return JSON.stringify(items);
      }
    }
  }
};

module.exports = functions()