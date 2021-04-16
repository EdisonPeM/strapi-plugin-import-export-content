export function isUrlMedia(url) {
  try {
    const parsed = new URL(url);
    const format = parsed.pathname.split(".").pop().toLowerCase();
    switch (format) {
      case "png":
      case "gif":
      case "jpg":
      case "jpeg":
      case "svg":
      case "mp3":
      case "wav":
      case "ogg":
      case "mp4":
      case "ogg":
      case "webm":
      case "avi":
        return true;
      default:
        return false;
    }
  } catch (error) {
    return false;
  }
}

export function getMediaFormat(url) {
  const parsed = new URL(url);
  const format = parsed.pathname.split(".").pop().toLowerCase();
  switch (format) {
    case "png":
    case "gif":
    case "jpg":
    case "jpeg":
    case "svg":
      return { type: "image", format };
    case "mp3":
    case "wav":
    case "ogg":
      return { type: "audio", format };
    case "mp4":
    case "ogg":
    case "webm":
    case "avi":
      return { type: "video", format };
    default:
      break;
  }
}
