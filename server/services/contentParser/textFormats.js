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
const functions = () => ({
  // ------------------------------------- //
  //           Number Validation           //
  // ------------------------------------- //
  textIsNumber: (value) => {
    if (typeof value === "string" && value.trim() !== "") {
      return !isNaN(value);
    }

    return false;
  },

  textToNumber: (value) => {
    return parseFloat(value);
  },

  textIsBoolean: (value) => {
    return (
      booleanStringPossibleValues.trueValues.includes(value.toLowerCase()) ||
      booleanStringPossibleValues.falseValues.includes(value.toLowerCase())
    );
  },

  textToBoolean: (value) => {
    return booleanStringPossibleValues.trueValues.includes(value);
  },

  // ------------------------------------- //
  //           Object Validation           //
  // ------------------------------------- //
  textIsObject: (value) => {
    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  },

  textToObject(value) {
    return JSON.parse(value);
  }

})

module.exports = functions()