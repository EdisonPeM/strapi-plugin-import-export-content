import { TOGGLE_DRAFT, CHANGE_FIELD_TARGET, REMOVE_ITEM } from "./actions";

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_DRAFT: {
      return {
        ...state,
        asDraft: !state.asDraft,
      };
    }

    case CHANGE_FIELD_TARGET: {
      const { fieldName, fieldTarget } = payload;
      const { fieldsMapping, attributes } = state;
      return {
        ...state,
        fieldsMapping: {
          ...fieldsMapping,
          [fieldName]: {
            ...fieldsMapping[fieldName],
            targetField: fieldTarget,
            targetFormat:
              (fieldTarget !== "none" && attributes[fieldTarget].type) || null,
          },
        },
      };
    }

    case REMOVE_ITEM: {
      const { items } = state;
      return {
        ...state,
        items: items.filter((item) => item !== payload),
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
