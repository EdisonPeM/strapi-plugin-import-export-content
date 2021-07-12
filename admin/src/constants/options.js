const BASE_OPTIONS = [
  {
    name: "media",
    type: "select",
    label: "Select how medias will be exported.",
    optionalValues: ["none", "ids", "url", "without-formats", "full"],
    defaultValue: "url",
  },
  {
    name: "relations",
    type: "select",
    label: "Select how relation will be exported.",
    optionalValues: ["none", "ids", "full"],
    defaultValue: "none",
  },
  {
    name: "ids",
    label: "Remove Ids",
    type: "boolean",
    defaultValue: true,
  },
  {
    name: "timestamp",
    label: "Remove TimeStamps",
    type: "boolean",
    defaultValue: false,
  },
  {
    name: "user",
    label: "Remove User Data",
    type: "boolean",
    defaultValue: false,
  },
];

export default BASE_OPTIONS;
