'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="glass-panel p-8 rounded-2xl max-w-md w-full flex flex-col items-center">
        <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">Something went wrong!</h2>
        <p className="text-zinc-400 mb-8">
          We encountered an unexpected error while processing your request. Our team has been notified.
        </p>
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-white text-zinc-900 rounded-lg font-medium transition-colors border border-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)] w-full justify-center"
        >
          <RefreshCcw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
