// Action Types
export const TOGGLE_DRAFT = "TOGGLE_DRAFT";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const CHANGE_FIELD_TARGET = "CHANGE_FIELD_TARGET";

// Action Getters
export const toggleAsDraft = () => ({ type: TOGGLE_DRAFT });
export const removeItem = (item) => ({ type: REMOVE_ITEM, payload: item });
export const changeFieldTarget = (fieldName, fieldTarget) => ({
  type: CHANGE_FIELD_TARGET,
  payload: { fieldName, fieldTarget },
});
