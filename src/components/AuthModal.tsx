import { useState, useMemo } from 'react';
import { Cpu, X, Mail, KeyRound, CheckCircle2, AlertCircle, ShieldCheck, Check, Sparkles, UserCheck } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onLoginSuccess 
}: AuthModalProps) {
  const [authMode, setAuthMode] = useState<'technician' | 'guest'>('technician');

  // Technician Form State
  const [credential, setCredential] = useState('');
  const [pin, setPin] = useState('');
  const [benchStation, setBenchStation] = useState('bench_1');

  // Touched state for Validation UI
  const [credentialTouched, setCredentialTouched] = useState(false);
  const [pinTouched, setPinTouched] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Validation UI computations
  const validation = useMemo(() => {
    const trimmedCred = credential.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedCred);
    const isTechBadge = /^TECH-\d{3,6}$/i.test(trimmedCred) || /^TECH\d{3,6}$/i.test(trimmedCred) || /^MTR-\d{3,6}$/i.test(trimmedCred);
    const isCredentialValid = isEmail || isTechBadge;

    const hasPinMinLength = pin.length >= 4;
    const hasPinMaxLength = pin.length <= 12;
    const hasPinNumber = /\d/.test(pin);
    const isPinValid = hasPinMinLength && hasPinMaxLength && hasPinNumber;

    const isFormValid = isCredentialValid && isPinValid;

    // Password strength computation for Validation UI
    let pinStrength: 'weak' | 'medium' | 'strong' = 'weak';
    if (pin.length >= 8 && /[A-Z]/.test(pin) && /\d/.test(pin)) {
      pinStrength = 'strong';
    } else if (pin.length >= 6 && /\d/.test(pin)) {
      pinStrength = 'medium';
    }

    let credError = '';
    if (!trimmedCred) {
      credError = 'Technician ID or work email is required.';
    } else if (!isCredentialValid) {
      credError = 'Must be a valid email (name@domain.com) or Badge ID (e.g. TECH-1048).';
    }

    let pinError = '';
    if (!pin) {
      pinError = 'Access PIN is required.';
    } else if (!hasPinMinLength) {
      pinError = `PIN too short (${pin.length}/4 digits minimum).`;
    } else if (!hasPinNumber) {
      pinError = 'PIN must include at least one number.';
    }

    return {
      isEmail,
      isTechBadge,
      isCredentialValid,
      hasPinMinLength,
      hasPinNumber,
      isPinValid,
      isFormValid,
      pinStrength,
      credError,
      pinError
    };
  }, [credential, pin]);

  if (!isOpen) return null;

  const handleTechnicianSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCredentialTouched(true);
    setPinTouched(true);
    setSubmitAttempted(true);

    if (!validation.isFormValid) {
      return;
    }

    const isEmail = validation.isEmail;
    const displayName = isEmail 
      ? credential.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      : `Tech #${credential.toUpperCase()}`;

    onLoginSuccess({
      id: `usr_${Date.now()}`,
      name: displayName,
      email: isEmail ? credential : `${credential.toLowerCase()}@bench.internal`,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      role: "Certified Lead Technician",
      bench: benchStation,
      repairsCompleted: 12,
      eWasteDivertedKg: 34.5,
      co2SavedKg: 88.2,
      reputationPoints: 420,
      badges: ['Chassis Diagnostician', 'SMD Reflow Level 2'],
      completedCourseIds: ['chassis_basics', 'smd_mastery']
    });
    onClose();
  };

  const handleGuestLogin = () => {
    onLoginSuccess({
      id: "usr_guest",
      name: "Guest Technician",
      email: "guest@diy.org",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      role: "Guest Technician",
      repairsCompleted: 0,
      eWasteDivertedKg: 0,
      co2SavedKg: 0,
      reputationPoints: 50,
      badges: [],
      completedCourseIds: []
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-stone-900 border border-stone-800 p-6 sm:p-8 space-y-5 shadow-2xl text-white">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center text-stone-950 shadow-md">
            <Cpu className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">Authorized Console Access</h2>
            <p className="text-xs text-stone-400 mt-0.5">Authenticate credentials to sync telemetry and offline manuals.</p>
          </div>
        </div>

        {/* Navigation Mode Tabs */}
        <div className="flex rounded-xl bg-stone-950 p-1 border border-stone-800">
          <button
            type="button"
            onClick={() => setAuthMode('technician')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'technician'
                ? 'bg-amber-400 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Technician ID Sign-In</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('guest')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'guest'
                ? 'bg-amber-400 text-stone-950 shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Guest Pass</span>
          </button>
        </div>

        {authMode === 'technician' ? (
          <form onSubmit={handleTechnicianSubmit} className="space-y-4 pt-1">
            {/* Live Validation Engine Status Banner */}
            <div className={`p-2.5 rounded-xl text-xs font-medium border transition-colors flex items-center justify-between ${
              validation.isFormValid
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : (credentialTouched || pinTouched || submitAttempted)
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  : 'bg-stone-800/60 border-stone-700/60 text-stone-400'
            }`}>
              <div className="flex items-center gap-2">
                {validation.isFormValid ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (credentialTouched || pinTouched || submitAttempted) ? (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                ) : (
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="text-[11px] font-semibold">
                  {validation.isFormValid 
                    ? 'All validation checks passed' 
                    : (credentialTouched || pinTouched || submitAttempted)
                      ? 'Please satisfy the input rules highlighted below'
                      : 'Real-time validation UI active'}
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-900/60">
                {validation.isFormValid ? 'VERIFIED' : 'PENDING'}
              </span>
            </div>

            {/* Field 1: Credential (Email or Badge ID) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-300 flex items-center gap-1">
                  <span>Work Email or Badge ID</span>
                  <span className="text-rose-400">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setCredential('TECH-4092');
                    setCredentialTouched(true);
                  }}
                  className="text-[10px] text-amber-400 hover:text-amber-300 underline font-mono cursor-pointer"
                >
                  Auto-fill demo badge
                </button>
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={credential}
                  onChange={e => {
                    setCredential(e.target.value);
                    if (!credentialTouched) setCredentialTouched(true);
                  }}
                  onBlur={() => setCredentialTouched(true)}
                  placeholder="e.g., tech@bench.org or TECH-1048"
                  className={`w-full pl-9 pr-9 py-2.5 rounded-xl text-xs bg-stone-950 border transition-all text-white placeholder-stone-600 focus:outline-none ${
                    (credentialTouched || submitAttempted)
                      ? validation.isCredentialValid
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'border-rose-500 ring-2 ring-rose-500/20'
                      : 'border-stone-800 focus:ring-2 focus:ring-amber-400'
                  }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  {(credentialTouched || submitAttempted) && (
                    validation.isCredentialValid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                    )
                  )}
                </div>
              </div>

              {/* Inline Validation Error / Success */}
              {(credentialTouched || submitAttempted) && (
                <div>
                  {!validation.isCredentialValid ? (
                    <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{validation.credError}</span>
                    </p>
                  ) : (
                    <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                      <Check className="w-3 h-3 shrink-0" />
                      <span>Authorized technician format accepted</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Field 2: PIN / Access Code */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-300 flex items-center gap-1">
                  <span>Security PIN / Passcode</span>
                  <span className="text-rose-400">*</span>
                </label>
                <span className="text-[10px] text-stone-500 font-mono">
                  {pin.length}/12 digits
                </span>
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={pin}
                  maxLength={12}
                  onChange={e => {
                    setPin(e.target.value);
                    if (!pinTouched) setPinTouched(true);
                  }}
                  onBlur={() => setPinTouched(true)}
                  placeholder="Min 4 characters (e.g., 2049)"
                  className={`w-full pl-9 pr-9 py-2.5 rounded-xl text-xs bg-stone-950 border transition-all text-white placeholder-stone-600 focus:outline-none ${
                    (pinTouched || submitAttempted)
                      ? validation.isPinValid
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                        : 'border-rose-500 ring-2 ring-rose-500/20'
                      : 'border-stone-800 focus:ring-2 focus:ring-amber-400'
                  }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  {(pinTouched || submitAttempted) && (
                    validation.isPinValid ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-400" />
                    )
                  )}
                </div>
              </div>

              {/* Security strength meter */}
              {pin.length > 0 && (
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[10px] text-stone-400 font-medium">
                    <span>Security Gauge:</span>
                    <span className={
                      validation.pinStrength === 'strong' ? 'text-emerald-400 font-bold' :
                      validation.pinStrength === 'medium' ? 'text-amber-400 font-bold' :
                      'text-rose-400 font-bold'
                    }>
                      {validation.pinStrength.toUpperCase()}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-stone-800 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full transition-all ${
                      validation.pinStrength === 'strong' ? 'w-full bg-emerald-400' :
                      validation.pinStrength === 'medium' ? 'w-2/3 bg-amber-400' :
                      'w-1/3 bg-rose-400'
                    }`} />
                  </div>
                </div>
              )}

              {/* Inline Validation Error */}
              {(pinTouched || submitAttempted) && !validation.isPinValid && (
                <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{validation.pinError}</span>
                </p>
              )}
            </div>

            {/* Field 3: Bench Station Assignment */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-300">
                Active Bench / Station
              </label>
              <select
                value={benchStation}
                onChange={e => setBenchStation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs bg-stone-950 border border-stone-800 text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="bench_1">Bench 1 — Mainboard Diagnosis & Micro-probing</option>
                <option value="bench_2">Bench 2 — SMD Hot Air & BGA Rework</option>
                <option value="bench_3">Bench 3 — Panel & Backlight LED Testing</option>
                <option value="bench_mobile">Bench 4 — Mobile & Battery Servicing</option>
              </select>
            </div>

            {/* Submission CTA Button with Validation State */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!validation.isFormValid}
                className={`w-full py-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  validation.isFormValid
                    ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-lg active:scale-98'
                    : 'bg-stone-800 text-stone-500 cursor-not-allowed opacity-70'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {validation.isFormValid 
                    ? 'Authenticate & Enter Console' 
                    : 'Complete Valid Inputs to Authenticate'}
                </span>
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 pt-2 text-center">
            <p className="text-xs text-stone-400 leading-relaxed">
              Guest access bypasses technician credentials and gives instant read access to all circuit guides, catalogs, and offline databases without saving personal telemetry.
            </p>
            <button 
              onClick={handleGuestLogin}
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-black text-xs transition-all shadow-md active:scale-98 cursor-pointer"
            >
              Access as Guest Technician
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
