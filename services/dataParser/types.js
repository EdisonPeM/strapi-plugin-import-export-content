const EMAIL_REGEXP =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function isEmail(value) {
  EMAIL_REGEXP.lastIndex = 0;
  return EMAIL_REGEXP.test(value);
}

const DATE_ISO_REGEXP =
  /^(\d{4})(-(\d{2}))??(-(\d{2}))??(T(\d{2}):(\d{2})(:(\d{2}))??(\.(\d+))??(([\+\-]{1}\d{2}:\d{2})|Z)??)??$/;
function isDate(value) {
  DATE_ISO_REGEXP.lastIndex = 0;
  return DATE_ISO_REGEXP.test(value);
}

const TIME_REGEXP = /^((?:(?:0|1)\d|2[0-3])):([0-5]\d):([0-5]\d)(\.\d{0,3})?$/;
function isTime(value) {
  TIME_REGEXP.lastIndex = 0;
  return TIME_REGEXP.test(value);
}

function isUrl(value) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function isMediaUrl(value) {
  try {
    const parsed = new URL(value);
    const extension = parsed.pathname.split(".").pop().toLowerCase();
    switch (extension) {
      case "png":
      case "gif":
      case "jpg":
      case "jpeg":
      case "svg":
      case "bmp":
      case "tif":
      case "tiff":
        return true;
      case "mp3":
      case "wav":
      case "ogg":
        return true;
      case "mp4":
      case "avi":
        return true;
      default:
        return false;
    }
  } catch (error) {
    return false;
  }
}

module.exports = {
  isEmail,
  isDate,
  isTime,
  isUrl,
  isMediaUrl,
};
