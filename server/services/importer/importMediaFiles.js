const { urlIsMedia } = require("../utils/formatsValidator");
const request = require("request");

module.exports = (
  {
    strapi
  }
) => {
  const fetchFiles = (url) =>
    new Promise((resolve, reject) => {
      request({ url, method: "GET", encoding: null }, async (err, res, body) => {
        if (err) reject(err);

        const type = res.headers["content-type"].split(";").shift();
        const size = parseInt(res.headers["content-length"]) | 0;

        const parsed = new URL(url);
        const fullName = parsed.pathname.split("/").pop().toLowerCase();

        resolve({
          buffer: body,
          filename: fullName,
          name: fullName.replace(/\.[a-zA-Z]*$/, ""),
          type,
          size,
        });
      });
    });

  async function importMediaFromUrl(url, user) {
    if (!urlIsMedia(url)) return null;

    try {
      const mediaInfo = await fetchFiles(url);
      const fileInfo = {
        name: mediaInfo.name,
        alternativeText: "",
        caption: "",
      };

      const { optimize } = strapi.plugins.upload.services["image-manipulation"];
      const { buffer, info } = await optimize(mediaInfo.buffer);

      const uploadService = strapi.plugins.upload.services.upload;
      const formattedFile = uploadService.formatFileInfo(mediaInfo, fileInfo);

      const fileData = {
        ...formattedFile,
        ...info,
        buffer,
      };

      const uploadedFile = await uploadService.uploadFileAndPersist(fileData, {
        user,
      });

      if (uploadedFile && uploadedFile.id) return uploadedFile.id;
      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  return {
    importMediaFromUrl
  };
};
