import { Button } from './Button';

type SocialLinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export const SocialLink = ({ href, label, icon }: SocialLinkProps) => (
  <Button
    href={href}
    icon={icon}
    variant="social"
    target="_blank"
    rel="noopener noreferrer"
    ariaLabel={label}
  />
);

export type { SocialLinkProps }; 