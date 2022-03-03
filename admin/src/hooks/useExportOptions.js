
import { useState } from 'react';
import BASE_OPTIONS from '../constants/options';

function useExportOptions() {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [options, setOptions] = useState(
    BASE_OPTIONS.reduce((acc, { name, defaultValue }) => {
      acc[name] = defaultValue;
      return acc;
    }, {})
  );

  const updateOption = (option, value) => {
    setOptions({
      ...options,
      [option]: value,
    });
  };

  return {
    options,
    isOptionsOpen,
    setIsOptionsOpen,
    updateOption,
  }
}

export default useExportOptions;