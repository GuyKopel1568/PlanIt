import { useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import HomeHeader from '../components/HomeHeader';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Globe from '../components/Globe';
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

  return (
    <div className=" bg-gray-900 flex flex-col lg:flex-row w-screen min-h-screen bg-cover bg-center transition-all items-center ">
      <div
        data-aos="fade-right"
        className="z-10 flex items-center justify-center w-full lg:w-2/3 p-24"
      >
        <HomeHeader />
      </div>
    </div>
  );
}

export default Home;
