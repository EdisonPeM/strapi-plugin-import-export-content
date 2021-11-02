export const MapContentTypes = (emptyMessage, contentTypes) => {
  return [{ label: emptyMessage, value: "" }].concat(
    contentTypes.map(({ uid, info, apiID }) => ({
      label: info.label || apiID,
      value: uid,
    }))
  );
};
