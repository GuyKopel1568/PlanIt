import { GiHamburgerMenu } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import Toggle from './Toggle';

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="navbar ">
      <div className="block md:hidden">
        <GiHamburgerMenu className="text-3xl" />
      </div>

      <div className="navbarLinks">
        <Toggle onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Toggle>

        <NavLink id="navHome" to="/">
          Home
        </NavLink>

        <NavLink id="navAbout" to="/about">
          About
        </NavLink>

        <NavLink id="navContact" to="/contact">
          Contact
        </NavLink>

        <button className="FormButton">Register/Sign-Up</button>
      </div>
    </nav>
  );
}

export default Navbar;
