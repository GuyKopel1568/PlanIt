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
    <div
      className="flex flex-col lg:flex-row w-screen min-h-screen bg-cover bg-center transition-all duration-500 items-center justify-center"
      style={{
        backgroundImage: isDarkMode
          ? "url('/backgroundDark.png')"
          : "url('/backgroundLight.png')",
      }}
    >
      {/* Left column - Boarding pass */}
      <div
        data-aos="fade-right"
        className="z-10 flex items-center justify-center w-full lg:w-1/2 p-6"
      >
        <HomeHeader />
      </div>

      {/* Right column - Globe */}
      <div
        data-aos="fade-down"
        className="relative z-0 flex items-center justify-center w-full lg:w-1/2 px-4 pb-10"
      >
        <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[650px] lg:h-[650px]">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={isDarkMode ? 15 : 2} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <Globe
              scale={3}
              texturePath={`/earth/${
                isDarkMode ? 'earth_night' : 'earth_day'
              }.jpg`}
            />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default Home;
