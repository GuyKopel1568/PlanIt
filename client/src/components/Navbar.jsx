import { CiHome, CiPhone, CiLogin, CiCircleInfo } from 'react-icons/ci';
import { Link, useLocation } from 'react-router-dom';
import ThemeButton from './ThemeButton';
import UserAdminController from './UserAdminController';

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navItems = [
    {
      to: '/',
      label: 'Home',
      icon: <CiHome className="w-7 h-7 md:w-10 md:h-10" />,
    },
    {
      to: '/contact',
      label: 'Contact',
      icon: <CiPhone className="w-7 h-7 md:w-10 md:h-10" />,
    },
    {
      to: '/signin',
      label: 'Sign In',
      icon: <CiLogin className="w-7 h-7 md:w-10 md:h-10" />,
    },
    {
      to: '/about',
      label: 'About',
      icon: <CiCircleInfo className="w-7 h-7 md:w-10 md:h-10" />,
    },
  ];

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-[9999] px-6 py-4 flex gap-4 md:gap-6 justify-center items-center
        transition-colors duration-300
        ${
          isHome
            ? 'bg-transparent text-white'
            : 'bg-transparent dark:bg-transparent text-sky-950 dark:text-sky-100 shadow-md'
        }
      `}
      // z-[9999] ensures navbar is above all other elements
    >
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.to}
          className="group relative w-12 h-12 flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-6 group-hover:opacity-0">
            {item.icon}
          </div>
          <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold opacity-0 translate-y-6 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            {item.label}
          </span>
        </Link>
      ))}

      <ThemeButton className="w-7 h-7 md:w-10 md:h-10" />

      <UserAdminController />
    </div>
  );
}

export default Navbar;
