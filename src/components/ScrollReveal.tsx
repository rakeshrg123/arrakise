import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, x: 0 };
      case 'down': return { y: -distance, x: 0 };
      case 'left': return { y: 0, x: distance };
      case 'right': return { y: 0, x: -distance };
      default: return { y: distance, x: 0 };
    }
  };

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [getInitialPosition().y, 0]);
  const x = useTransform(scrollYProgress, [0, 0.3], [getInitialPosition().x, 0]);
  
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const springX = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        opacity,
        y: springY,
        x: springX,
      }}
      initial={{ opacity: 0, ...getInitialPosition() }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;