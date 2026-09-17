import { X } from 'lucide-react';

export default function VideoTutorial({ 
  videoUrl, 
  onClose 
}: { 
  videoUrl: string; 
  onClose: () => void; 
}) {
  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/90 transition-all border border-white/10"
        title="Close Player"
      >
        <X className="w-4 h-4" />
      </button>

      <video 
        src={videoUrl} 
        controls 
        autoPlay 
        className="w-full h-full max-h-full object-contain"
      />
    </div>
  );
}
