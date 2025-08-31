import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Instagram, MessageCircle } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Collections', href: '#collections' },
    { name: 'Story', href: '#story' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            className="text-2xl font-bold tracking-wider"
            whileHover={{ scale: 1.05 }}
          >
            ARRAKISE
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-white transition-colors duration-200 font-medium"
                whileHover={{ y: -2 }}
              >
                {item.name}
              </motion.a>
            ))}
            <div className="flex items-center space-x-4 ml-6">
              <motion.a
                href="https://instagram.com/arrakise"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-pink-400 transition-colors duration-200"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-green-400 transition-colors duration-200"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <MessageCircle size={20} />
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden bg-black/95 backdrop-blur-md rounded-lg mt-2 p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-white/80 hover:text-white transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-white/20">
              <a
                href="https://instagram.com/arrakise"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-pink-400 transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-green-400 transition-colors duration-200"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;