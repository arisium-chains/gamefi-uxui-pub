'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'black' | 'yellow' | 'blue';
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'white', 
  text,
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const colorClasses = {
    white: 'border-white/30 border-t-white',
    black: 'border-black/30 border-t-black',
    yellow: 'border-yellow-400/30 border-t-yellow-400',
    blue: 'border-blue-400/30 border-t-blue-400'
  };

  const textColorClasses = {
    white: 'text-white',
    black: 'text-black',
    yellow: 'text-yellow-400',
    blue: 'text-blue-400'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div 
        className={`${sizeClasses[size]} border-2 ${colorClasses[color]} rounded-full animate-spin`}
      />
      {text && (
        <span className={`text-sm font-medium ${textColorClasses[color]}`}>
          {text}
        </span>
      )}
    </div>
  );
}