import React from "react";
import { getMediaFormat } from "../../../utils/mediaFormat";

function MediaPreview({ url, ...oterProps }) {
  const { type, format } = getMediaFormat(url);

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
