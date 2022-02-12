// -------------------------------------- //
//           Boolean Validation           //
// -------------------------------------- //
const booleanStringPossibleValues = {
  trueValues: ["true", "t"],
  falseValues: ["false", "f"],
};

// --------------------------- //
//           Exports           //
// --------------------------- //
module.exports = (
  {
    strapi
  }
) => {
  // ------------------------------------- //
  //           Number Validation           //
  // ------------------------------------- //
  function textIsNumber(value) {
    if (typeof value === "string" && value.trim() !== "") {
      return !isNaN(value);
    }

    return false;
  }

  function textToNumber(value) {
    return parseFloat(value);
  }

  function textIsBoolean(value) {
    return (
      booleanStringPossibleValues.trueValues.includes(value.toLowerCase()) ||
      booleanStringPossibleValues.falseValues.includes(value.toLowerCase())
    );
  }

  function textToBoolean(value) {
    return booleanStringPossibleValues.trueValues.includes(value);
  }

  // ------------------------------------- //
  //           Object Validation           //
  // ------------------------------------- //
  function textIsObject(value) {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }

  function textToObject(value) {
    return JSON.parse(value);
  }

  return {
    textIsNumber,
    textToNumber,
    textIsBoolean,
    textToBoolean,
    textIsObject,
    textToObject
  };
};
