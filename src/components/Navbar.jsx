import Toggle from '../components/Toggle';
import { useDarkMode } from '../context/DarkModeContext';

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="absolute top-0 left-0 w-full z-50 flex justify-end p-4 text-[--color-text-main] bg-transparent">
      <Toggle onClick={toggleDarkMode} />
    </div>
  );
}

export default Navbar;
