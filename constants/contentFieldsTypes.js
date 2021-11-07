const contentFieldsTypes = {
  string: "string",
  text: "string",
  richtext: "string",
  integer: "interger", // Special case of number
  biginteger: "string",
  decimal: "number",
  float: "number",
  date: "date",
  datetime: "date",
  time: "string",
  boolean: "boolean",
  email: "string",
  password: "string",
  enumeration: "string",
  json: "object",
  uid: "string",
  timestamp: "date",
};

module.exports = contentFieldsTypes;
