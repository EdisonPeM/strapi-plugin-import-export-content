import DataViewer from "../components/DataViewer";
import FORMATS from "../constants/formats";

function downloadFile(name, content, type) {
  const format = FORMATS.find(({ mimeType }) => mimeType === type);

  const file = new Blob([content], { type });
  const fileURL = window.URL.createObjectURL(file);

  const dateTime = new Date().toLocaleDateString();
  const el = document.createElement("a");
  el.href = fileURL;
  el.download = `${name}_${dateTime}${format.ext}` || "file.txt";
  el.click();
}

async function copyClipboard(content) {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error("Failed to copy!", err);
      return strapi.notification.toggle({
        type: "warning",
        message: "Copy to Clipboard Error",
      });
    }
  } else {
    const el = document.createElement("textarea");
    el.textContent = content;
    el.select();
    document.execCommand("copy");
  }

  strapi.notification.toggle({
    type: "success",
    message: "Content Copy to Clipboard",
  });
}

export { downloadFile, copyClipboard };
