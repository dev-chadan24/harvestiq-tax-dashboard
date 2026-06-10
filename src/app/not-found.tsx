import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="glass-panel p-8 rounded-2xl max-w-md w-full flex flex-col items-center">
        <div className="h-20 w-20 bg-zinc-800/50 rounded-full flex items-center justify-center mb-6 relative border border-zinc-700/50">
          <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl"></div>
          <Search className="h-10 w-10 text-zinc-400 relative z-10" />
        </div>
        <h2 className="text-3xl font-bold text-zinc-100 mb-2">404</h2>
        <h3 className="text-xl font-medium text-zinc-300 mb-4">Page Not Found</h3>
        <p className="text-zinc-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved to another URL.
        </p>
        <Link 
          href="/"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)] w-full justify-center"
        >
          <Home className="h-4 w-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
