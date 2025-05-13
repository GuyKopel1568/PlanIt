import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

function DarkGlobe({ texturePath, position = [0, 0, 0], scale = 2 }) {
  const globeRef = useRef();
  const texture = useLoader(TextureLoader, texturePath);

  useFrame(() => {
    // Spin the globe
    globeRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={globeRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default DarkGlobe;
