import { NavLink } from 'react-router-dom';
import Toggle from '../components/Toggle';
import { useDarkMode } from '../context/DarkModeContext';
import { useState } from 'react';
import Login from '../components/Login';
import { useUser } from '../hooks/useUser';

const LIST_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { user, logout, isAuthenticated } = useUser();
  console.log('user', user);
  return (
    <>
      <nav className="fixed bg-[var(--color-gray-800)] flex justify-center items-center gap-12 py-3 px-10 left-1/2 translate-x-[-50%] top-[20px] rounded-full backdrop-blur-md bg-opacity-60 text-[var(--color-gray-100)] shadow-lg z-50 text-sm md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] ">
        <ul className="flex gap-12 justify-center items-center">
          <li>
            <Toggle onClick={toggleDarkMode} isDarkMode={isDarkMode} />
          </li>
          {LIST_ITEMS.map(({ label, path }) => (
            <li key={label} className="relative group cursor-pointer">
              <NavLink to={path} className="relative pab-1">
                {label}
                <span className="absolute left-0 bottom-[-1px] w-0 h-1 rounded-xl bg-gradient-to-r from-[var(--color-blue-500)] to-[var(--color-gray-600)] transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </NavLink>
            </li>
          ))}
        </ul>
        {!user ? (
          <button
            className="uppercase bg-gradient-to-r from-[var(--color-blue-900)] to-[var(--color-gray-600)] py-1 px-6 rounded-3xl shadow-2xl text-white hover:scale-105 transition-all duration-300 ease-in-out font-semibold hover:from-[var(--color-blue-600)] hover:to-[var(--color-gray-500)] hover:shadow-[var(--color-blue-600)] shadow-[var(--color-gray-300)]"
            onClick={() => setIsFormOpen(true)}
          >
            Signup / Register
          </button>
        ) : (
          <button
            className="uppercase bg-gradient-to-r from-[var(--color-blue-900)] to-[var(--color-gray-600)] py-1 px-6 rounded-3xl shadow-2xl text-white hover:scale-105 transition-all duration-300 ease-in-out font-semibold hover:from-[var(--color-blue-600)] hover:to-[var(--color-gray-500)] hover:shadow-[var(--color-blue-600)] shadow-[var(--color-gray-300)]"
            onClick={logout}
          >
            Logout
          </button>
        )}
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
