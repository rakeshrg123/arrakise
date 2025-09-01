import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Center, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import * as THREE from 'three';

const FloatingHoodie = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[2, 2.5, 0.3]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          roughness={0.7}
          metalness={0.1}
        />
        {/* Embroidered detail */}
        <mesh position={[0, 0.3, 0.16]}>
          <planeGeometry args={[0.8, 0.4]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.2} />
        </mesh>
      </mesh>
    </Float>
  );
};

const Hero3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <FloatingHoodie />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-900/10 via-black to-purple-900/20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-black to-purple-900/30" />
      
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-300/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.1, 0.6, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Desert wind effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <ScrollReveal direction="left" delay={0.5}>
            <motion.div
              className="text-center lg:text-left"
            >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-white to-purple-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            >
              ARRAKISE
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-amber-100 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <span className="text-amber-300">Embroidered Excellence.</span><br />
              <span className="text-purple-400">Oversized Comfort.</span><br />
              <span className="text-white">Unmatched Quality.</span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <motion.a
                href="#collections"
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full font-semibold text-white shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Collections
              </motion.a>
              
              <motion.a
                href="#story"
                className="px-8 py-4 border-2 border-amber-300/50 rounded-full font-semibold text-amber-100 hover:bg-amber-500/10 hover:border-amber-300 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Our Story
              </motion.a>
            </motion.div>
            </motion.div>
          </ScrollReveal>

          {/* Right side - 3D Model */}
          <ScrollReveal direction="right" delay={0.8}>
            <motion.div
              className="h-96 lg:h-[500px] relative"
            >
            {/* Glow effect behind 3D model */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-amber-500/20 rounded-2xl blur-xl" />
            <Hero3D />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 15, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="w-6 h-10 border-2 border-amber-300/50 border-t-amber-400 rounded-full flex justify-center backdrop-blur-sm">
          <motion.div 
            className="w-1 h-3 bg-amber-400 rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;