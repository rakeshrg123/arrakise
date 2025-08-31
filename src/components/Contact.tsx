import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Mail, MapPin } from 'lucide-react';
import * as THREE from 'three';

const ContactSphere = ({ position, color }: { position: [number, number, number]; color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </Float>
  );
};

const Contact3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />
      
      <ContactSphere position={[-1.5, 1, 0]} color="#8b5cf6" />
      <ContactSphere position={[1.5, -1, 0]} color="#06b6d4" />
      <ContactSphere position={[0, 0, -1]} color="#f59e0b" />
    </Canvas>
  );
};

const Contact = () => {
  const contactMethods = [
    {
      icon: <Instagram size={32} />,
      title: "Instagram",
      description: "Follow us for daily updates and behind-the-scenes content",
      action: "Follow @arrakise",
      link: "https://instagram.com/arrakise",
      color: "from-pink-500 to-purple-600",
      hoverColor: "hover:text-pink-400"
    },
    {
      icon: <MessageCircle size={32} />,
      title: "WhatsApp",
      description: "Get instant support and join our exclusive community",
      action: "Message Us",
      link: "https://wa.me/1234567890",
      color: "from-green-500 to-emerald-600",
      hoverColor: "hover:text-green-400"
    },
    {
      icon: <Mail size={32} />,
      title: "Email",
      description: "For business inquiries and collaborations",
      action: "hello@arrakise.com",
      link: "mailto:hello@arrakise.com",
      color: "from-blue-500 to-cyan-600",
      hoverColor: "hover:text-blue-400"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
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
              Join the Movement
            </motion.h2>

            <motion.p
              className="text-lg text-gray-300 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Connect with us and become part of the Arrakise family. 
              Get exclusive access to new drops, styling tips, and join a community 
              that values quality and authentic expression.
            </motion.p>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-4 p-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-500"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 10, scale: 1.02 }}
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold text-white ${method.hoverColor} transition-colors duration-300`}>
                      {method.title}
                    </h3>
                    <p className="text-gray-400 mb-1">
                      {method.description}
                    </p>
                    <span className="text-purple-400 font-medium">
                      {method.action}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right side - 3D Animation */}
          <motion.div
            className="h-96 lg:h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Contact3D />
          </motion.div>
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Ready to Experience Arrakise?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Don't miss out on our latest drops and exclusive community access. 
              Connect with us today and be part of something special.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full font-semibold text-white shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle size={20} />
                <span>Join via WhatsApp</span>
              </motion.a>
              
              <motion.a
                href="https://instagram.com/arrakise"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-semibold text-white shadow-lg hover:shadow-pink-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram size={20} />
                <span>Follow on Instagram</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;