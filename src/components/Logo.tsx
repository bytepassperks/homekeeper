import { Home } from 'lucide-react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'text';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
}

export function Logo({ 
  variant = 'full', 
  theme = 'light', 
  size = 'md',
  className = '',
  clickable = false,
  onClick 
}: LogoProps) {
  const sizes = {
    sm: { container: 'h-8', icon: 'w-8 h-8', text: 'text-base' },
    md: { container: 'h-10', icon: 'w-10 h-10', text: 'text-xl' },
    lg: { container: 'h-12', icon: 'w-12 h-12', text: 'text-2xl' },
    xl: { container: 'h-16', icon: 'w-16 h-16', text: 'text-3xl' }
  };

  const currentSize = sizes[size];
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const accentColor = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
  const hoverClass = clickable ? 'cursor-pointer transition-transform duration-200 hover:scale-105' : '';

  // Icon Only
  if (variant === 'icon') {
    return (
      <div 
        className={`${currentSize.icon} ${hoverClass} ${className}`}
        onClick={onClick}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
      >
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden">
          <Home className="w-3/5 h-3/5 text-white" />
          {/* Check mark overlay */}
          <div className="absolute top-1 right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // Text Only
  if (variant === 'text') {
    return (
      <div 
        className={`${currentSize.text} font-bold ${textColor} ${hoverClass} ${className}`}
        onClick={onClick}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
      >
        Home<span className={accentColor}>Keeper</span>
      </div>
    );
  }

  // Full Logo (Icon + Text)
  return (
    <div 
      className={`flex items-center gap-3 ${currentSize.container} ${hoverClass} ${className}`}
      onClick={onClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <div className={`${currentSize.icon} bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden flex-shrink-0`}>
        <Home className="w-3/5 h-3/5 text-white" />
        {/* Check mark overlay */}
        <div className="absolute top-1 right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <span className={`${currentSize.text} font-bold ${textColor} whitespace-nowrap`}>
        Home<span className={accentColor}>Keeper</span>
      </span>
    </div>
  );
}

// Animated Logo for loading states
export function AnimatedLogo({ size = 'lg' }: { size?: 'sm' | 'md' | 'lg' | 'xl' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <Logo variant="icon" size={size} className="animate-pulse" />
        <div className="absolute inset-0 animate-ping opacity-20">
          <Logo variant="icon" size={size} />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}
