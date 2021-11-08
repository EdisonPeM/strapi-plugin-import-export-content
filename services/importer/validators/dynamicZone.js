const validateComponent = require("./component");
const { toArray } = require("../../utils/arrays");

async function ValidateDynamicZone(value, components) {
  const dynamicValues = toArray(value);

  return Promise.all(
    dynamicValues.map(async (dynamicComponent) => {
      if (!dynamicComponent) return null;
      const { __component, ...component } = dynamicComponent;

      if (!__component || !components.includes(__component)) {
        return null;
      }

      const content = await validateComponent(component, __component);
      return { __component, ...content };
    })
  );
}

module.exports = ValidateDynamicZone;
