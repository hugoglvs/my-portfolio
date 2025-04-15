'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--card)] border-t border-[var(--neutral-400)]/10 py-8"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)]">
              © {currentYear} Hugo Gonçalves. Tous droits réservés.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <Link 
              href="https://github.com/hugoglvs" 
              target="_blank"
              className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] hover:text-[var(--neutral-900)] dark:hover:text-[var(--neutral-100)] transition-colors"
            >
              <Github size={24} />
            </Link>
            <Link 
              href="https://linkedin.com/in/hugo-gonçalves-4250031b0/" 
              target="_blank"
              className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] hover:text-[var(--neutral-900)] dark:hover:text-[var(--neutral-100)] transition-colors"
            >
              <Linkedin size={24} />
            </Link>
            <Link 
              href="mailto:hugoglvs@icloud.com"
              className="text-[var(--neutral-600)] dark:text-[var(--neutral-400)] hover:text-[var(--neutral-900)] dark:hover:text-[var(--neutral-100)] transition-colors"
            >
              <Mail size={24} />
            </Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
} 