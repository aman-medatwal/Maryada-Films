import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

const PanoramaDome = ({ imagePath }) => {
  // Load the equirectangular image as a texture
  const texture = useLoader(THREE.TextureLoader, imagePath);
  
  return (
    <Sphere args={[500, 60, 40]} scale={[-1, 1, 1]}>
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </Sphere>
  );
};

const LoaderFallback = () => (
  <Html center>
    <div style={{ color: '#ffaa00', fontFamily: 'Outfit', letterSpacing: '2px', fontWeight: 'bold' }}>
      LOADING VR ENVIRONMENT...
    </div>
  </Html>
);

const PanoramaViewer = ({ imagePath }) => {
  return (
    <div style={{ width: '100%', height: '100%', cursor: 'grab' }} onMouseDown={e => e.currentTarget.style.cursor = 'grabbing'} onMouseUp={e => e.currentTarget.style.cursor = 'grab'}>
      <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
        <Suspense fallback={<LoaderFallback />}>
          <PanoramaDome imagePath={imagePath} />
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          enableDamping 
          dampingFactor={0.05} 
          autoRotate 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
    </div>
  );
};

export default PanoramaViewer;
