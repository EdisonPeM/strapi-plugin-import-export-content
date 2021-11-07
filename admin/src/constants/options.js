const BASE_OPTIONS = [
  {
    name: "medias",
    type: "select",
    label: "export.options.medias",
    optionalValues: ["none", "ids", "url", "without-formats", "full"],
    defaultValue: "none",
  },
  {
    name: "relations",
    type: "select",
    label: "export.options.relations",
    optionalValues: ["none", "ids", "full"],
    defaultValue: "none",
  },
  {
    name: "ids",
    label: "export.options.ids",
    type: "boolean",
    defaultValue: false,
  },
  {
    name: "timestamp",
    label: "export.options.timestamps",
    type: "boolean",
    defaultValue: false,
  }
];

export default BASE_OPTIONS;
