import { useDarkMode } from '../context/DarkModeContext';

function Layout({ children }) {
  const { isDarkMode } = useDarkMode();

  const backgroundImage = isDarkMode
    ? "url('/images/backgroundImageDarkMode.png')"
    : "url('/images/backgroundImageLightMode.png')";

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage }}
    >
      {children}
    </div>
  );
}

export default Layout;
