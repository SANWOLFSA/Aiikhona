import { Cpu, X } from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onLoginSuccess: (user: any) => void; 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-md rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-6 shadow-2xl text-white">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full">
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center text-stone-950">
            <Cpu className="w-6 h-6 stroke-[2]" />
          </div>
          <h2 className="text-xl font-black">Authorized Console Access</h2>
          <p className="text-xs text-stone-400">Authenticate your technician ID to sync offline cached guides.</p>
        </div>

        <button 
          onClick={() => {
            onLoginSuccess({
              id: "usr_guest",
              name: "Guest Technician",
              avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
              role: "Technician",
              repairsCompleted: 0,
              eWasteDivertedKg: 0,
              co2SavedKg: 0,
              reputationPoints: 50,
              badges: [],
              completedCourseIds: []
            });
            onClose();
          }}
          className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs transition-all shadow-md"
        >
          Access as Guest Technician
        </button>
      </div>
    </div>
  );
}
