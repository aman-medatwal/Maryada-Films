import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Line, Box, Stars } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import * as THREE from 'three';

// 1. Particle Field (Home Page)
export const ParticleField = (props) => {
  const ref = useRef();
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial transparent color="#ffaa00" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
};

// 2. Wireframe Globe (About Page)
export const WireframeGlobe = () => {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.2;
      ref.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 32, 32]} scale={1.5}>
      <meshBasicMaterial color="#ffaa00" wireframe transparent opacity={0.15} />
    </Sphere>
  );
};

// 3. Floating Geometry (Services Page)
export const FloatingGeometry = () => {
  const groupRef = useRef();
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x += delta * (i % 2 === 0 ? 0.2 : -0.2);
        child.rotation.y += delta * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(20)].map((_, i) => (
        <Box key={i} args={[0.2, 0.2, 0.2]} position={[
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5
        ]}>
          <meshBasicMaterial color="#ffaa00" wireframe transparent opacity={0.3} />
        </Box>
      ))}
    </group>
  );
};

// 4. Wave Lines (Projects Page)
export const WaveLines = () => {
  const ref = useRef();
  const count = 50;
  
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < count; i++) {
      pts.push(new THREE.Vector3((i / count) * 10 - 5, 0, 0));
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      const positions = ref.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const x = positions[i * 3];
        positions[i * 3 + 1] = Math.sin(x * 2 + time * 2) * 0.5;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group rotation={[Math.PI / 4, 0, 0]} position={[0, -1, 0]}>
      {[...Array(10)].map((_, i) => (
        <Line key={i} ref={i === 0 ? ref : null} points={points} color="#ffaa00" lineWidth={1} position={[0, 0, (i - 5) * 0.5]} transparent opacity={0.3} />
      ))}
    </group>
  );
};

// 5. Starfield Warp (Contact Page)
export const Starfield = () => {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.z -= delta * 0.1;
    }
  });
  return (
    <group ref={ref}>
      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} color="#ffaa00" />
    </group>
  );
};

// 6. Floating Shards (Projects Page)
export const FloatingShards = () => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.children.forEach((child, index) => {
        child.rotation.x += delta * (index % 2 === 0 ? 0.3 : -0.2);
        child.rotation.y += delta * 0.4;
        // Float up and down slowly
        child.position.y += Math.sin(state.clock.elapsedTime + index) * 0.005;
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {[...Array(40)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
          ]}
        >
          <tetrahedronGeometry args={[Math.random() * 0.5 + 0.2, 0]} />
          <meshBasicMaterial color="#ffaa00" wireframe transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
};

// 7. Floating Logo (Home Page Expansion)
export const FloatingLogo = () => {
  const meshRef = useRef();
  const colorMap = useLoader(THREE.TextureLoader, '/my_work/logo/MARDAYA FILMS Logo monogram.png');
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3, 3, 0.1]} />
      <meshStandardMaterial map={colorMap} transparent opacity={0.9} />
    </mesh>
  );
};

// 8. Matrix Rain (Careers Page)
export const MatrixRain = () => {
  const ref = useRef();
  const particleCount = 2000;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; // x
      pos[i * 3 + 1] = Math.random() * 20 - 10; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      const posAttr = ref.current.geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        posAttr.array[i * 3 + 1] -= delta * 5; // fall down
        if (posAttr.array[i * 3 + 1] < -10) {
          posAttr.array[i * 3 + 1] = 10; // reset to top
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#00ffcc" size={0.05} transparent opacity={0.6} />
    </points>
  );
};

// 9. Interactive Grid (Case Studies Page)
export const InteractiveGrid = () => {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = -Math.PI / 2; // Lay flat
      ref.current.position.y = -2;
      ref.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[50, 50, 40, 40]} />
      <meshBasicMaterial color="#ffaa00" wireframe transparent opacity={0.2} />
    </mesh>
  );
};

// 10. Kinetic Torus (About Page Expansion)
export const KineticTorus = () => {
  const ref = useRef();
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.4;
      ref.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.5, 0.4, 128, 32]} />
      <meshStandardMaterial 
        color="#ffaa00" 
        roughness={0.2} 
        metalness={0.8} 
        wireframe={true} 
      />
    </mesh>
  );
};

// 11. Glowing Spheres Background (Glass Card UI)
export const GlowingSpheresBackground = () => {
  const sphere1Ref = useRef();
  const sphere2Ref = useRef();
  const sphere3Ref = useRef();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    
    if (sphere1Ref.current) {
      sphere1Ref.current.position.y = Math.sin(time * 0.5) * 1.5 + 2;
      sphere1Ref.current.position.x = Math.cos(time * 0.3) * 1.5 - 2;
    }
    if (sphere2Ref.current) {
      sphere2Ref.current.position.y = Math.cos(time * 0.4) * 2 - 1;
      sphere2Ref.current.position.x = Math.sin(time * 0.6) * 2 + 3;
    }
    if (sphere3Ref.current) {
      sphere3Ref.current.position.y = Math.sin(time * 0.3) * 2 - 2;
      sphere3Ref.current.position.x = Math.cos(time * 0.5) * 2 - 3;
    }
  });

  return (
    <group>
      {/* Soft Ambient lighting */}
      <ambientLight intensity={1.5} color="#ffffff" />
      
      {/* Orange/Yellow Sphere */}
      <mesh ref={sphere1Ref} position={[-2, 2, -5]}>
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial color="#ffaa00" />
      </mesh>
      
      {/* Magenta/Pink Sphere */}
      <mesh ref={sphere2Ref} position={[3, -1, -8]}>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial color="#ff0088" />
      </mesh>
      
      {/* Blue/Cyan Sphere */}
      <mesh ref={sphere3Ref} position={[-3, -2, -6]}>
        <sphereGeometry args={[2.8, 16, 16]} />
        <meshBasicMaterial color="#0088ff" />
      </mesh>
    </group>
  );
};

// Main wrapper to handle Canvas
const ThreeEffectCanvas = ({ effect: Effect }) => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Effect />
      </Canvas>
    </div>
  );
};

export default ThreeEffectCanvas;
