import { useState, useEffect } from 'react';

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    try {
      return storedValue !== null ? JSON.parse(storedValue) : initialState;
    } catch (err) {
      // fallback if value is not valid JSON (like a JWT token string)
      return storedValue || initialState;
    }
  });

  useEffect(() => {
    try {
      // Save JSON for objects or raw string if it's a simple value
      const valueToStore =
        typeof value === 'string' ? value : JSON.stringify(value);

      localStorage.setItem(key, valueToStore);
    } catch (err) {
      console.error('Error saving to localStorage:', err);
    }
  }, [value, key]);

  return [value, setValue];
}
