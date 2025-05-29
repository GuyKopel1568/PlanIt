// src/pages/Home.jsx
import { useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import HomeHeader from '../components/HomeHeader';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  // pick the right image from public/
  const bgUrl = isDarkMode ? 'url(/night-window.png)' : 'url(/day-window.png)';

  return (
    <div
      className="
        flex  
        w-screen min-h-screen
        bg-cover bg-center
        transition-all
        items-center justify-center
      "
      style={{ backgroundImage: bgUrl }}
    >
      <div
        data-aos="fade-right"
        className="z-10 flex items-center justify-center w-full px-4 sm:px-8 md:px-12 lg:w-2/3 lg:p-24 py-12"
      >
        <HomeHeader />
      </div>
    </div>
  );
}

export default Home;
