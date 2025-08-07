import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';

export default function Airplane() {
  const ref = useRef();
  const { scene } = useGLTF('/airplane.glb');

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={0.08}
      rotation={[0, 1.8 * Math.PI, 1.8 * Math.PI]}
    />
  );
}
