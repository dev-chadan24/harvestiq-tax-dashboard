'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Briefcase, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-zinc-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200 font-sans relative overflow-x-hidden">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 z-10 relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              Portfolio Management
            </h1>
            <p className="text-xs md:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Manage your connected wallets and exchanges, and sync your transaction history.
            </p>
          </div>
          <div className="flex items-center gap-3 self-start lg:self-auto shrink-0 z-10">
            <Button leftIcon={<Plus className="w-4 h-4" />}>
              Add Portfolio
            </Button>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center text-center animate-fade-in min-h-[400px]">
          <div className="h-16 w-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
            <Briefcase className="h-8 w-8 text-blue-400 relative z-10" />
          </div>
          <h3 className="text-xl font-bold text-zinc-100 mb-2">No Portfolios Found</h3>
          <p className="text-zinc-400 max-w-md mb-8">
            Connect your favorite exchanges or import a CSV file to automatically sync your holdings and tax lots.
          </p>
          <Button variant="outline" leftIcon={<Search className="w-4 h-4" />}>
            Browse Supported Integrations
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
