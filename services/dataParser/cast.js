const { BOOLEAN_VALUES } = require("./constants");
const { isNumber, isObject, isDate } = require("./formats");

function cast(value, format) {
  if (typeof value === format) return value;

  switch (format) {
    case "string": {
      if (isDate) return new Date(value).toISOString();
      if (isObject(value)) return JSON.stringify(value);
      return `${value}`;
    }

    case "number": {
      if (isNumber(value)) return parseFloat(value);
      return value;
    }

    case "interger": {
      if (isNumber(value)) return parseInt(value);
      return value;
    }

    case "boolean": {
      const value_lower = value.toLowerCase();
      if (BOOLEAN_VALUES.trueValues.includes(value_lower)) return true;
      if (BOOLEAN_VALUES.falseValues.includes(value_lower)) return false;
      return !!value;
    }

    case "object": {
      if (isObject(value)) return JSON.parse(value);
      return null;
    }

    case "date": {
      if (isDate(value)) return new Date(value);
      return value;
    }

    default: {
      return value;
    }
  }
}

module.exports = cast;
