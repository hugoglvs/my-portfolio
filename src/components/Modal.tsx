'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-2xl">
              <motion.div
                className="bg-[var(--card)] rounded-xl shadow-2xl border border-[var(--neutral-200)] dark:border-[var(--neutral-800)] overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 border-b border-[var(--neutral-200)] dark:border-[var(--neutral-800)]">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {title}
                    </h2>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg hover:bg-[var(--neutral-100)] dark:hover:bg-[var(--neutral-800)] transition-colors"
                    >
                      <X className="w-5 h-5 text-[var(--neutral-600)] dark:text-[var(--neutral-400)]" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {children}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 