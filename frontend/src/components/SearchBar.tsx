import { useState, useEffect } from 'react';

interface Props {
  onSearch: (query: string) => void;
}

/**
 * Search bar with debounce — waits for the user to stop typing
 * for 400ms before triggering the search.
 */
export function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 400);

    // Cancels the previous timer if the user is still typing
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search shows..."
      style={{
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxSizing: 'border-box',
      }}
    />
  );
}