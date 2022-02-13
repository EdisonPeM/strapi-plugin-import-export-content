module.exports = {
  type: 'admin',
  routes: [
  {
    method: "GET",
    path: "/",
    handler: "import-export-content.index",
    config: {
      policies: ['admin::isAuthenticatedAdmin'],
    }
  },
  {
    method: "POST",
    path: "/pre-analyze",
    handler: "import-export-content.preAnalyzeContent",
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
      ]
    },
  },
  {
    method: "POST",
    path: "/import",
    handler: "import-export-content.importItems",
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'admin::hasPermissions',
          config: {
            actions: ['plugin::import-export-content.import'],
          },
        }
      ]
    },
  },
  {
    method: "POST",
    path: "/export",
    handler: "import-export-content.exportItems",
    config: {
      policies: [
        'admin::isAuthenticatedAdmin',
        {
          name: 'admin::hasPermissions',
          config: {
            actions: ['plugin::import-export-content.export'],
          },
        }
      ]
    },
  }
]}