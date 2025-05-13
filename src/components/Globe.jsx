import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

function Globe({ texturePath, scale = 3 }) {
  const globeRef = useRef();
  const texture = useLoader(TextureLoader, texturePath);

  useFrame(() => {
    globeRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={globeRef} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default Globe;
