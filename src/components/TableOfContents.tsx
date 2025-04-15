import Link from 'next/link';
import { motion } from 'framer-motion';

interface TableOfContentsLink {
  href: string;
  label: string;
}

interface TableOfContentsProps {
  links: TableOfContentsLink[];
}

export function TableOfContents({ links }: TableOfContentsProps) {
  return (
    <motion.nav 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[var(--card)] rounded-lg p-6 shadow-md flex flex-col justify-center h-full"
    >
      <h3 className="text-xl font-bold mb-6 font-display bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Table des matières
      </h3>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <motion.li
            key={link.href}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <Link 
              href={link.href} 
              className="block py-2 px-3 rounded-lg hover:bg-[var(--neutral-200)] dark:hover:bg-[var(--neutral-800)] transition-colors duration-200 text-[var(--neutral-600)] dark:text-[var(--neutral-400)] hover:text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
} 