import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, Center } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const StoryElement3D = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Needle representation */}
        <mesh position={[0, 1, 0]} rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.02, 0.02, 3]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Thread */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 1]} />
          <meshStandardMaterial color="#8b5cf6" />
        </mesh>
        
        {/* Fabric piece */}
        <mesh position={[0, -1.5, 0]}>
          <planeGeometry args={[2, 1.5]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
      </Float>
    </group>
  );
};

const Story3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />
      <StoryElement3D />
    </Canvas>
  );
};

const Story = () => {
  const storyPoints = [
    {
      title: "Crafted with Passion",
      description: "Every stitch tells a story. Our embroidered designs are created by skilled artisans who pour their heart into each piece.",
      icon: "🎨"
    },
    {
      title: "Premium Materials",
      description: "We source only the finest fabrics to ensure our oversized fits provide unmatched comfort and durability.",
      icon: "✨"
    },
    {
      title: "Sustainable Fashion",
      description: "Quality over quantity. Our pieces are designed to last, reducing waste and promoting conscious consumption.",
      icon: "🌱"
    },
    {
      title: "Community Driven",
      description: "Join our growing community of fashion enthusiasts who value authenticity, quality, and unique style.",
      icon: "🤝"
    }
  ];

  return (
    <section id="story" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - 3D Animation */}
          <motion.div
            className="h-96 lg:h-[500px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Story3D />
          </motion.div>

          {/* Right side - Story content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our Story
            </motion.h2>

            <motion.p
              className="text-lg text-gray-300 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Born from a passion for exceptional craftsmanship and contemporary streetwear, 
              Arrakise represents the perfect fusion of traditional embroidery techniques with 
              modern oversized silhouettes. We believe that clothing should be more than just fabric—
              it should be an expression of individuality and quality.
            </motion.p>

            <div className="space-y-8">
              {storyPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  className="flex items-start space-x-4 group"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                      {point.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Story;