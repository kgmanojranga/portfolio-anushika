import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const Container = ({
  children,
  className = '',
  size = 'xl',
}: ContainerProps) => {
  // Use pixel-based max-widths to prevent layout shrinking when browser font size changes
  // This keeps containers at fixed widths while allowing text to scale for accessibility
  const maxWidths = {
    sm: '768px', // ~max-w-3xl
    md: '896px', // ~max-w-4xl
    lg: '1024px', // ~max-w-5xl
    xl: '1280px', // ~max-w-7xl (main container)
    full: '100%',
  };

  return (
    <div
      className={`mx-auto px-4 sm:px-6 lg:px-8 ${className}`}
      style={{ maxWidth: maxWidths[size] }}
    >
      {children}
    </div>
  );
};

export default Container;
