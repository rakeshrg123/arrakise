import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, MessageCircle, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Instagram size={24} />,
      href: "https://instagram.com/arrakise",
      label: "Instagram",
      color: "hover:text-pink-400"
    },
    {
      icon: <MessageCircle size={24} />,
      href: "https://wa.me/1234567890",
      label: "WhatsApp",
      color: "hover:text-green-400"
    },
    {
      icon: <Mail size={24} />,
      href: "mailto:hello@arrakise.com",
      label: "Email",
      color: "hover:text-blue-400"
    }
  ];

  const footerLinks = [
    {
      title: "Collections",
      links: [
        { name: "Hoodies", href: "#collections" },
        { name: "T-Shirts", href: "#collections" },
        { name: "New Arrivals", href: "#collections" },
        { name: "Best Sellers", href: "#collections" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#story" },
        { name: "Our Story", href: "#story" },
        { name: "Sustainability", href: "#story" },
        { name: "Careers", href: "#contact" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Size Guide", href: "#contact" },
        { name: "Care Instructions", href: "#contact" },
        { name: "Returns", href: "#contact" },
        { name: "FAQ", href: "#contact" }
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-t from-black to-gray-900 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ARRAKISE
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Embroidered excellence meets oversized comfort. 
                Join our community of fashion enthusiasts who value 
                quality, authenticity, and unique style.
              </p>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-gray-800 rounded-full text-white/80 ${social.color} transition-all duration-300 hover:bg-gray-700`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Footer links */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <motion.div
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Arrakise. All rights reserved.
          </p>
          
          <motion.div
            className="flex items-center space-x-1 text-gray-400 text-sm"
            whileHover={{ scale: 1.05 }}
          >
            <span>Made with</span>
            <Heart size={16} className="text-red-500 mx-1" />
            <span>for quality fashion</span>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;