import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, OrbitControls, Text } from '@react-three/drei';

const nodes = [
  { id: 'talent', label: 'BOARD' },
  { id: 'community', label: 'RED' },
  { id: 'learning', label: 'RUTA' },
  { id: 'ops', label: 'OPS' },
];

function HubNode({ position, label, active, index }) {
  const ref = useRef();
  useFrame((state) => { if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * (0.12 + index * 0.02); });
  return <group position={position} ref={ref}>
    <mesh><octahedronGeometry args={[active ? .48 : .34, 0]} /><meshStandardMaterial color={active ? '#B4FF39' : '#56604F'} wireframe={!active} /></mesh>
    <Text position={[0, -.75, 0]} fontSize={.16} color={active ? '#EDEFE8' : '#7D8377'} anchorX="center">{label}</Text>
  </group>;
}

export default function Ecosystem({ activeIndex }) {
  const positions = [[-2.1, 1.25, 0], [2.1, 1.25, 0], [-2.1, -1.35, 0], [2.1, -1.35, 0]];
  return <Canvas camera={{ position: [0, 0, 7], fov: 45 }} dpr={[1, 1.5]}>
    <ambientLight intensity={1.3} /><pointLight position={[0, 2, 4]} intensity={7} color="#EDEFE8" />
    <mesh><icosahedronGeometry args={[.72, 1]} /><meshStandardMaterial color="#B4FF39" wireframe /></mesh>
    <mesh scale={.35}><sphereGeometry args={[.7, 20, 20]} /><meshBasicMaterial color="#B4FF39" /></mesh>
    {positions.map((position, index) => <React.Fragment key={nodes[index].id}><HubNode position={position} label={nodes[index].label} active={activeIndex === index} index={index} /><Line points={[[0,0,0], position]} color={activeIndex === index ? '#B4FF39' : '#5F6659'} lineWidth={activeIndex === index ? 1.3 : .6} transparent opacity={activeIndex === index ? .9 : .28} /></React.Fragment>)}
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={.3} />
  </Canvas>;
}
