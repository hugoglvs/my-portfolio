import Link from 'next/link';

interface TableOfContentsLink {
  href: string;
  label: string;
}

interface TableOfContentsProps {
  links: TableOfContentsLink[];
}

export function TableOfContents({ links }: TableOfContentsProps) {
  return (
    <nav className="bg-white/5 rounded-lg p-4 flex flex-col justify-center h-full">
      <h3 className="text-lg font-semibold mb-4">Table des matières</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link 
              href={link.href} 
              className="hover:text-primary transition"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
} 