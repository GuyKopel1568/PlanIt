import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Globe from '../components/Globe';
import Toggle from '../components/Toggle';
import { useDarkMode } from '../context/DarkModeContext';

function Home() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <Toggle onClick={toggleDarkMode} />
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={isDarkMode ? 15 : 2} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        <Globe
          texturePath={`/earth/${isDarkMode ? 'earth_night' : 'earth_day'}.jpg`}
        />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </>
  );
}

export default Home;
