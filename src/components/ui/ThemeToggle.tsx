'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { Button } from './Button';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleTheme}
      className="w-10 h-10 p-0 rounded-full bg-zinc-900/50 hover:bg-zinc-800"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 text-zinc-400 hover:text-amber-400 transition-colors" />
      ) : (
        <Moon className="h-5 w-5 text-zinc-600 hover:text-blue-500 transition-colors" />
      )}
    </Button>
  );
}
