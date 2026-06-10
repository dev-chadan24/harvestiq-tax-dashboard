import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-900/80 bg-zinc-950/70 backdrop-blur-md py-6 text-center text-xs text-zinc-500 shadow-inner z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 select-none">
          <span className="font-black tracking-widest text-[9px] text-zinc-400 bg-zinc-900 border border-zinc-800/80 px-2 py-0.5 rounded">
            HarvestIQ Ledger System
          </span>
          <span className="text-zinc-600">•</span>
          <span>FinTech Portfolio Review</span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span>Crafted By</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span>DEV-CHANDAN </span>
        </div>
      </div>
    </footer>
  );
}
