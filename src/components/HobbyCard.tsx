'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface HobbyCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function HobbyCard({ title, description, imageUrl }: HobbyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative bg-[var(--card)] rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
          style={{ backgroundImage: `url("${imageUrl}")` }}
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <motion.h3 
          className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] leading-relaxed flex-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
} 