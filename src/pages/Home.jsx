import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Globe from '../components/Globe';
import { useDarkMode } from '../context/DarkModeContext';
import HomeHeader from '../components/HomeHeader';

function Home() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] w-screen h-screen">
      <div className="flex items-center justify-center p-10">
        <HomeHeader />
      </div>

      {/* Right column (Globe) */}
      <div className="flex items-center justify-center mr-400">
        <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[700px] lg:h-[700px] fles items-center justify-start">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            className="w-full h-full aspect-square"
          >
            <ambientLight intensity={isDarkMode ? 15 : 2} />
            <directionalLight position={[5, 5, 5]} intensity={2} />
            <Globe
              scale={3}
              texturePath={`/earth/${isDarkMode ? 'earth_night' : 'earth_day'}.jpg`}
            />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}

export default Home;
