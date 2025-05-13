import Toggle from '../components/Toggle';
import { useDarkMode } from '../context/DarkModeContext';

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="text-[--color-text-main]">
      <Toggle onClick={toggleDarkMode} />
    </div>
  );
}

export default Navbar;
