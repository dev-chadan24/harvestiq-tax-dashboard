'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-zinc-100 flex flex-col selection:bg-blue-600/30 selection:text-blue-200 font-sans relative overflow-x-hidden">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 z-10 relative">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              Tax Reports
            </h1>
            <p className="text-xs md:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Generate and download your IRS Form 8949 and Schedule D reports for tax filing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {/* Mock Report Card */}
          <div className="glass-panel p-6 rounded-2xl border border-zinc-800/50 hover:border-blue-500/30 transition-all group">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <FileText className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold px-2 py-1 bg-zinc-800 text-zinc-300 rounded-md">FY 2026</span>
            </div>
            <h3 className="text-lg font-bold text-zinc-100 mb-1">Comprehensive Tax Report</h3>
            <p className="text-sm text-zinc-400 mb-6">Includes Form 8949, Schedule D, and detailed capital gains/losses breakdown.</p>
            <Button className="w-full" leftIcon={<Download className="w-4 h-4" />}>
              Generate PDF
            </Button>
          </div>
          
          <div className="glass-panel p-6 rounded-2xl border border-dashed border-zinc-800/50 flex flex-col items-center justify-center text-center text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-colors cursor-pointer min-h-[250px]">
            <FileText className="h-8 w-8 mb-3" />
            <span className="font-medium">Request Custom Report</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
