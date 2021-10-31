import React from "react";

// FORMATS
import {
  Bool as BoolIcon,
  Json as JsonIcon,
  Text as TextIcon,
  NumberIcon,
  Pending as TimeIcon,
  Enumeration as ListIcon,
  Media as MediaIcon,
  Email as EmailIcon,
  Calendar as DateIcon,
  RichText as RichTextIcon,
} from "@buffetjs/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faRandom } from "@fortawesome/free-solid-svg-icons";

const ICONS = {
  string: TextIcon,

  // Sub Types of String
  email: EmailIcon,
  text: RichTextIcon,
  date: DateIcon,
  time: TimeIcon,
  url: ({ fill }) => <FontAwesomeIcon icon={faLink} color={fill} />,
  media: MediaIcon,

  // Others
  boolean: BoolIcon,
  number: NumberIcon,
  object: JsonIcon,

  // temp Array
  array: ListIcon,

  // mixed formats
  mixed: ({ fill }) => <FontAwesomeIcon icon={faRandom} color={fill} />,
};

function FormatIcon({ format }) {
  const Icon = ICONS[format] || TextIcon;
  return <Icon fill="#69BA05" />;
}

export default FormatIcon;
