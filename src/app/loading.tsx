import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-xl bg-blue-500/20 animate-pulse"></div>
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin relative z-10" />
        </div>
        <p className="text-zinc-400 font-medium">Loading Dashboard...</p>
      </div>
    </div>
  );
}
