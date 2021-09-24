"use strict";

const pluginPkg = require("../package.json");
const PLUGIN_ID = pluginPkg.name.replace(/^strapi-plugin-/i, "");

function getService(service = PLUGIN_ID) {
  const SERVICES = strapi.plugins[PLUGIN_ID].services;
  return SERVICES[service];
}

function processErrors(errors = []) {
  const errorMessages = errors.flatMap((obj) => obj.res.map((msg) => msg)).flatMap((arr) => arr);
  const withoutDuplicates = errorMessages
    .filter((elem, index) => errorMessages.indexOf(elem) == index) // remove duplicates
    .splice(0, 10) // Limit to the first 10 errors to keep it human readable
    .join('\n');
  return withoutDuplicates;
} 

const PERMISSIONS = require("../constants/permissions");

/**
 * import-export-content.js controller
 *
 * @description: A set of functions called "actions" of the `import-export-content` plugin.
 */

module.exports = {
  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    ctx.send({ message: "ok" }); // Send 200 `ok`
  },

  preAnalyzeContent: async (ctx) => {
    const { data, type } = ctx.request.body;
    if (!data || !type) {
      return ctx.throw(400, "Required parameters missing");
    }

    try {
      const service = getService();
      const data = await service.preAnalyzeContent(ctx);
      ctx.send({ data, message: "ok" });
    } catch (error) {
      console.error(error);
      ctx.throw(406, `could not parse: ${error}`);
    }
  },

  importItems: async (ctx) => {
    const { target, fields, items } = ctx.request.body;

    if (!target || !fields || !items) {
      return ctx.throw(400, "Required parameters missing");
    }

    const { userAbility } = ctx.state;
    if (
      userAbility.cannot(PERMISSIONS.create, target.uid) &&
      userAbility.cannot(PERMISSIONS.update, target.uid)
    ) {
      return ctx.forbidden();
    }

    try {
      const service = getService();
      const results = await service.importItems(ctx);
      const errors = results
        .map((res, index) => ({ res, index }))
        .filter((obj) => obj.res !== true);
      const errorMessages = processErrors(errors);
      ctx.send({
        succesfully: errors.length === 0,
        message: errors.length === 0
          ? "All Data Imported"
          : `${errors.length} item(s) were not imported: \n${errorMessages}`,
      });
    }
  },

  exportItems: async (ctx) => {
    const { target, type, options } = ctx.request.body;

    if (!target || !type || !options) {
      return ctx.throw(400, "Required parameters missing");
    }

    const { userAbility } = ctx.state;
    if (userAbility.cannot(PERMISSIONS.read, target.uid)) {
      return ctx.forbidden();
    }

    try {
      const service = getService();
      const data = await service.exportItems(ctx);
      ctx.send({ data, message: "ok" });
    } catch (error) {
      console.error(error);
      ctx.throw(406, `could not parse: ${error}`);
    }
  },
};
