import { useState } from 'react';
import FORMATS from '../constants/formats';

const exportFormatsOptions = FORMATS.map(({ name, mimeType }) => ({
  label: name,
  value: mimeType,
}));

function useExportFormats(defaultFormat = "application/json") {
  const [exportFormat, setExportFormat] = useState(defaultFormat);

  return {
    exportFormat,
    setExportFormat,
    exportFormatsOptions,
    getExtension
  }
}

export default useExportFormats;