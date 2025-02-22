import { useState, useEffect } from "react";

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value.toLowerCase()); // Initial lowercase

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value.toLowerCase()); // ✅ Always store lowercase
    }, delay);

    return () => clearTimeout(handler); // Cleanup timeout on value change
  }, [value, delay]);

  return debouncedValue;
};
