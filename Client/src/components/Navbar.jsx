import { NavLink } from 'react-router-dom';
import Toggle from '../components/Toggle';
import { useDarkMode } from '../context/DarkModeContext';
import { useState } from 'react';
import Login from '../pages/Login';

const LIST_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <nav className="fixed bg-black flex justify-between items-center gap-16 py-3 px-10 left-1/2 translate-x-[-50%] top-[20px] rounded-full backdrop-blur-md bg-opacity-60 text-white shadow-lg z-10 text-sm">
        <ul className="flex gap-8 items-center  ">
          <li>
            <Toggle onClick={toggleDarkMode} />
          </li>
          {LIST_ITEMS.map(({ label, path }) => (
            <li key={label} className="relative group cursor-pointer">
              <NavLink to={path}>
                {label}
                <span className="absolute left-0 bottom-[-1px] w-0 h-1 rounded-xl bg-gradient-to-r from-blue-500 to-gray-600 transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          className="uppercase bg-gradient-to-r from-blue-900 to-gray-600 py-1 px-6 rounded-3xl shadow-2xl text-white hover:scale-105 transition-all duration-300 ease-in-out font-semibold hover:from-blue-950 hover:to-gray-500 hover:shadow-blue-600 shadow-gray-300"
          onClick={() => setIsFormOpen(true)}
        >
          Signup / Register
        </button>
      </nav>
      {isFormOpen && (
        <div className="fixed grid w-[100%] backdrop-blur-sm h-screen place-items-center z-50">
          <Login onClose={() => setIsFormOpen(false)} />
        </div>
      )}
    </>
  );
}

export default Navbar;
