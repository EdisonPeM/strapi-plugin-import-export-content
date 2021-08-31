const BASE_OPTIONS = [
  {
    name: "medias",
    type: "select",
    optionalValues: ["none", "ids", "url", "without-formats", "full"],
    defaultValue: "full",
  },
  {
    name: "relations",
    type: "select",
    optionalValues: ["none", "ids", "full"],
    defaultValue: "full",
  },
  {
    name: "ids",
    type: "boolean",
    defaultValue: false,
  },
  {
    name: "timestamp",
    type: "boolean",
    defaultValue: false,
  },
];

export default BASE_OPTIONS;
