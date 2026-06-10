import React from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  className = ''
}: AvatarProps) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-xl'
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full bg-zinc-800 text-zinc-100 overflow-hidden ring-2 ring-zinc-800 ring-offset-2 ring-offset-zinc-950 ${sizes[size]} ${className}`}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to text if image fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : fallback ? (
        <span className="font-semibold">{getInitials(fallback)}</span>
      ) : (
        <User className="w-1/2 h-1/2 text-zinc-400" />
      )}
    </div>
  );
}
