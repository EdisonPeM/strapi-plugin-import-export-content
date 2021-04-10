"use strict";

const pluginPkg = require("../package.json");
const PLUGIN_ID = pluginPkg.name.replace(/^strapi-plugin-/i, "");

function getService(service = PLUGIN_ID) {
  const SERVICES = strapi.plugins[PLUGIN_ID].services;
  return SERVICES[service];
}

const PERMISSIONS = {
  read: "plugins::content-manager.explorer.read",
  create: "plugins::content-manager.explorer.create",
  update: "plugins::content-manager.explorer.update",
};

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
    // Send 200 `ok`
    ctx.send({
      message: "ok",
    });
  },

  preAnalyzeContent: async (ctx) => {
    const { data, type } = ctx.request.body;
    if (!data || !type) {
      return ctx.throw(400, "Required parameters missing");
    }

    try {
      const service = getService();
      const data = await service.preAnalyzeContent(ctx);
      ctx.send(data);
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
      return ctx.throw(403, "Forbidden");
    }

    try {
      const service = getService();
      const results = await service.importItems(ctx);
      const succesfully = results.every((res) => res);
      ctx.send({
        succesfully,
        message: succesfully
          ? "All Data Imported"
          : results.some((res) => res)
          ? "Some Items Imported"
          : "No Items Imported",
      });
    } catch (error) {
      console.error(error);
      ctx.throw(406, `could not parse: ${error}`);
    }
  },
};
