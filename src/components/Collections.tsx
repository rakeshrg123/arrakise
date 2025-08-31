import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const Product3D = ({ color, position, embroideryColor }: { color: string; position: [number, number, number]; embroideryColor: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <group position={position}>
        {/* Main garment body */}
        <mesh ref={meshRef}>
          <boxGeometry args={[1.8, 2.2, 0.25]} />
          <meshStandardMaterial 
            color={color} 
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        
        {/* Embroidered design */}
        <mesh position={[0, 0.2, 0.13]}>
          <planeGeometry args={[0.6, 0.3]} />
          <meshStandardMaterial 
            color={embroideryColor} 
            emissive={embroideryColor} 
            emissiveIntensity={0.1}
          />
        </mesh>
        
        {/* Sleeves for hoodie */}
        <mesh position={[-1.2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.35, 1.8]} />
          <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
        <mesh position={[1.2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.35, 1.8]} />
          <meshStandardMaterial color={color} roughness={0.8} />
        </mesh>
      </group>
    </Float>
  );
};

const Collections3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />
      <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.3} penumbra={0.5} />
      
      <Product3D color="#1a1a1a" position={[-2.5, 0, 0]} embroideryColor="#8b5cf6" />
      <Product3D color="#2d2d2d" position={[0, 0, 0]} embroideryColor="#06b6d4" />
      <Product3D color="#0f0f0f" position={[2.5, 0, 0]} embroideryColor="#f59e0b" />
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
};

const Collections = () => {
  const collections = [
    {
      name: "Shadow Series",
      description: "Deep black hoodies with intricate purple embroidery",
      price: "From $89",
      image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      name: "Urban Essence",
      description: "Charcoal oversized tees with cyan geometric patterns",
      price: "From $65",
      image: "https://images.pexels.com/photos/8532617/pexels-photo-8532617.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      name: "Midnight Collection",
      description: "Premium black hoodies with golden thread details",
      price: "From $95",
      image: "https://images.pexels.com/photos/8532618/pexels-photo-8532618.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  return (
    <section id="collections" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Our Collections
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Each piece is meticulously crafted with premium materials and intricate embroidery, 
            designed for those who appreciate quality and comfort.
          </p>
        </motion.div>

        {/* 3D Product Showcase */}
        <motion.div
          className="h-96 mb-16 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-white/10"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Collections3D />
        </motion.div>

        {/* Collection Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.name}
              className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors duration-300">
                  {collection.name}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {collection.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-purple-400">
                    {collection.price}
                  </span>
                  <motion.button
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-medium transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </motion.button>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;