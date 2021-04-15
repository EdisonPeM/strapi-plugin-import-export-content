import React from "react";

function getFormat(url) {
  const parsed = new URL(url);
  const format = parsed.pathname.split(".").pop().toLowerCase();
  switch (format) {
    case "png":
    case "gif":
    case "jpg":
    case "jpeg":
    case "svg":
      return { type: "image", format };;
    case "mp3":
    case "wav":
    case "ogg":
      return { type: "video", format };
    case "mp4":
    case "ogg":
    case "webm":
    case "avi":
      return { type: "video", format };
    default:
      break;
  }
}

function MediaPreview({ url, ...oterProps }) {
  const { type, format } = getFormat(url);

  switch (type) {
    case "image":
      return <img {...oterProps} src={url} alt={`photo-media`} />;

    case "video":
      return (
        <video {...oterProps}>
          <source src={url} type={`video/${format}`} />
        </video>
      );

    case "audio":
      return (
        <audio controls>
          <source src={url} type={`audio/${format}`} />
        </audio>
      );
    default:
      return null;
  }
}

export default MediaPreview;
