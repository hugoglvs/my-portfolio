import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  href: string;
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'social' | 'glass' | 'rounded';
  download?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

export const Button = ({
  href,
  label = "",
  icon = null,
  description = "",
  variant = 'default',
  download = false,
  target,
  rel,
  ariaLabel,
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center gap-2 transition-colors duration-200";
  
  const variantStyles = {
    default: "p-1 border-1 rounded-md",
    social: "p-2 rounded-lg border-1 border-black/20 bg-gray-300/10 hover:bg-black/20",
    glass: "p-1 text-gray-500",
    rounded: "py-1 px-2 rounded-full border-1 border-black/40 bg-gray-300/10 hover:bg-gray-500/10 text-gray-500 text-sm",
  };

  const defaultIcon = (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  // If it's a download link or external link, use regular <a> tag
  if (download || target === '_blank') {
    return (
      <a
        href={href}
        download={download}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={`${baseStyles} ${variantStyles[variant]}`}
      >
        {icon || (variant === 'default' ? defaultIcon : null)}
        {label}
        {description && <span className="text-sm text-gray-500">{description}</span>}
      </a>
    );
  }

  // For internal navigation, use Next.js Link
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {icon || (variant === 'default' ? defaultIcon : null)}
      {label}
      {description && <span className="text-sm text-gray-500">{description}</span>}
    </Link>
  );
};

export type { ButtonProps }; 