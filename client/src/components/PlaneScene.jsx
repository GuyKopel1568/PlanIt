import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Airplane from './Airplane';

export default function PlaneScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      <Airplane />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
