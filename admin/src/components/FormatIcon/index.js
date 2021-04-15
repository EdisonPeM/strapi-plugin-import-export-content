import React from "react";

// FORMATS
import {
  Bool as BoolIcon,
  Json as JsonIcon,
  Text as TextIcon,
  NumberIcon,
  Pending as HourIcon,
  Enumeration as ListIcon,
  Media as MediaIcon,
  Email as EmailIcon,
  Calendar as DateIcon,
  RichText as RichTextIcon,
} from "@buffetjs/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

const ICONS = {
  string: TextIcon,

  // Sub Types of String
  email: EmailIcon,
  text: RichTextIcon,
  date: DateIcon,
  hour: HourIcon,
  url: ({ fill }) => <FontAwesomeIcon icon={faLink} color={fill} />,
  media: MediaIcon,

  // Others
  boolean: BoolIcon,
  number: NumberIcon,
  object: JsonIcon,
  array: ListIcon,
};

function FormatIcon({ format }) {
  const Icon = ICONS[format] || TextIcon;
  return <Icon fill="#69BA05" />;
}

export default FormatIcon;
