import { useEffect, useState } from 'react';
import { CiSun, CiDark } from 'react-icons/ci';

function ThemeButton({ className = '' }) {
  const [isDark, setIsDark] = useState(() => {
    // Try to get theme from localStorage or default to system preference
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';

    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    return prefersDark;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      type="button"
      className={`transition duration-300 hover:scale-110 active:scale-95 ${className}`}
    >
      {isDark ? (
        <CiDark className="w-full h-full" />
      ) : (
        <CiSun className="w-full h-full" />
      )}
    </button>
  );
}

export default ThemeButton;
