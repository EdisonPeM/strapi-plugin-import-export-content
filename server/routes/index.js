module.exports = [
  {
    method: "GET",
    path: "/",
    handler: "importExportContent.index",
    config: {
      policies: []
    }
  },
  {
    method: "POST",
    path: "/pre-analyze",
    handler: "importExportContent.preAnalyzeContent",
    config: {
      policies: []
    }
  },
  {
    method: "POST",
    path: "/import",
    handler: "importExportContent.importItems",
    config: {
      policies: []
    }
  },
  {
    method: "POST",
    path: "/export",
    handler: "importExportContent.exportItems",
    config: {
      policies: []
    }
  }
]