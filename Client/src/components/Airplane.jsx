import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default function Airplane(props) {
  const gltf = useLoader(GLTFLoader, '/Airplane.glb');

  return <primitive object={gltf.scene} scale={0.2} {...props} />;
}
