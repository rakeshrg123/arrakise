import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

const SandParticles = ({ count = 5000 }: { count?: number }) => {
  const meshRef = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  });

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      
      // Move particles in a swirling motion
      const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3] += Math.sin(state.clock.elapsedTime * 0.5 + i * 0.01) * 0.01;
        positions[i3 + 1] += Math.cos(state.clock.elapsedTime * 0.3 + i * 0.01) * 0.005;
        positions[i3 + 2] += Math.sin(state.clock.elapsedTime * 0.4 + i * 0.01) * 0.008;
      }
      meshRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={meshRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#d4a574"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
};

const SandstormScene = ({ intensity }: { intensity: number }) => {
  const { camera } = useThree();
  
  useFrame((state) => {
    // Camera shake effect during sandstorm
    if (intensity > 0.5) {
      camera.position.x = Math.sin(state.clock.elapsedTime * 10) * 0.02 * intensity;
      camera.position.y = Math.cos(state.clock.elapsedTime * 8) * 0.01 * intensity;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2 * (1 - intensity)} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.5 * (1 - intensity)} 
        color="#d4a574" 
      />
      <fog attach="fog" args={['#8B4513', 1, 15]} />
      <SandParticles count={Math.floor(3000 * intensity)} />
    </>
  );
};

interface SandstormIntroProps {
  onComplete: () => void;
}

const SandstormIntro: React.FC<SandstormIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'storm' | 'clearing' | 'complete'>('storm');
  const [stormIntensity, setStormIntensity] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase('clearing');
    }, 2000);

    const timer2 = setTimeout(() => {
      setPhase('complete');
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  useEffect(() => {
    if (phase === 'clearing') {
      const interval = setInterval(() => {
        setStormIntensity(prev => Math.max(0, prev - 0.05));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [phase]);

  if (phase === 'complete') return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-gradient-to-b from-amber-900 via-orange-800 to-red-900"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* 3D Sandstorm */}
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <SandstormScene intensity={stormIntensity} />
      </Canvas>

      {/* Text reveal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence>
          {phase === 'clearing' && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold mb-4 text-white drop-shadow-2xl"
                initial={{ letterSpacing: '0.5em', opacity: 0 }}
                animate={{ letterSpacing: '0.1em', opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              >
                ARRAKISE
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-amber-200 font-light tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Born from the Desert of Excellence
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Overlay effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'clearing' ? 1 : 0 }}
        transition={{ duration: 1 }}
      />
    </motion.div>
  );
};

export default SandstormIntro;