"use strict";

const pluginPkg = require("../package.json");
const PLUGIN_ID = pluginPkg.name.replace(/^strapi-plugin-/i, "");

function getService(service = PLUGIN_ID) {
  const SERVICES = strapi.plugins[PLUGIN_ID].services;
  return SERVICES[service];
}

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
    // const { user } = ctx.state;

    const data = ctx.request.body;
    const { target, fields, items } = data;
    if (!target || !fields || !items) {
      return ctx.throw(400, "Required parameters missing");
    }

    // const importService = getService("contentexportimport");
    // await importService.importData(ctx);

    ctx.send({
      message: "ok",
    });
  },
};
