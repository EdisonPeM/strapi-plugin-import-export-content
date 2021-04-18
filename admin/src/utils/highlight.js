import {
  highlight as prismHighlight,
  languages as prismLanguages,
} from "prismjs/components/prism-core";
import "prismjs/components/prism-json";

import FORMATS from "../constants/formats";

prismLanguages.csv = {
  value: /[^\r\n",]|"(?:[^"]|"")"(?!")/,
  punctuation: /[,;]/,
};

const languages = FORMATS.reduce((langs, { name, mimeType }) => {
  langs[mimeType] = prismLanguages[name];
  return langs;
}, {});

const highlight = (code, mimetype) => prismHighlight(code, languages[mimetype]);

export default highlight;
