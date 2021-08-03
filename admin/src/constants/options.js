const BASE_OPTIONS = [
  {
    name: "medias",
    type: "select",
    label: "Select how medias will be exported.",
    optionalValues: ["none", "ids", "url", "without-formats", "full"],
    defaultValue: "full",
  },
  {
    name: "relations",
    type: "select",
    label: "Select how relation will be exported.",
    optionalValues: ["none", "ids", "full"],
    defaultValue: "full",
  },
  {
    name: "ids",
    label: "Remove Ids",
    type: "boolean",
    defaultValue: false,
  },
  {
    name: "timestamp",
    label: "Remove TimeStamps",
    type: "boolean",
    defaultValue: false,
  }
];

export default BASE_OPTIONS;
