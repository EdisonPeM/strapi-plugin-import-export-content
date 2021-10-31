export const infoNotify = (message) =>
  strapi.notification.toggle({
    type: "info",
    message,
  });

export const successNotify = (message) =>
  strapi.notification.toggle({
    type: "success",
    message,
  });

export const warningNotify = (message) =>
  strapi.notification.toggle({
    type: "warning",
    message,
  });
