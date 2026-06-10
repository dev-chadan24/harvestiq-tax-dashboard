'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Percent, Settings, User } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface HeaderProps {
  onSettingsClick?: () => void;
  showSimControls?: boolean;
}

export function Header({ onSettingsClick, showSimControls = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-lg shadow-lg shadow-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex items-center gap-3"
        >
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black tracking-tighter border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <span className="relative z-10 text-lg">H</span>
            </div>
            <div>
              <span className="font-black text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-300">
                Harvest
              </span>
              <span className="font-extrabold text-lg text-blue-400">IQ</span>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="flex items-center gap-4"
        >
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-zinc-900 border border-zinc-800 text-zinc-400 shadow-inner">
            <Percent className="w-3.5 h-3.5 text-blue-400" />
            Tax Year: FY 2026-27
          </span>

          {onSettingsClick && (
            <button
              type="button"
              onClick={onSettingsClick}
              className={`p-2 rounded-xl border transition-all duration-300 shadow-inner ${
                showSimControls
                  ? "bg-blue-500/20 border-blue-500/30 text-blue-400"
                  : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-zinc-200"
              }`}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}

          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-zinc-800/80">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-zinc-700/80 flex items-center justify-center text-zinc-300 shadow-lg relative overflow-hidden">
              <User className="w-4.5 h-4.5" />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-zinc-200 leading-none">
                Chandan
              </span>
              <span className="text-[10px] font-extrabold tracking-wider text-zinc-500 uppercase mt-0.5">
                Portfolio Review
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
