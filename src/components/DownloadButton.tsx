import { Button } from './Button';

type DownloadButtonProps = {
  href: string;
  label?: string;
  description?: string;
  icon?: React.ReactNode | null;
  variant?: "default" | "social" | "glass" | "rounded";
};

export const DownloadButton = ({ href, label = "", icon = null, description = "", variant = "default"}: DownloadButtonProps) => (
  <Button
    href={href}
    label={label}
    icon={icon}
    description={description}
    variant={variant}
    download
  />
); 