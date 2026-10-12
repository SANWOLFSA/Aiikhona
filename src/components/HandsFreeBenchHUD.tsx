import React, { useState } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Sparkles, HelpCircle, ChevronDown, ChevronUp, Play, Send } from 'lucide-react';

export interface HandsFreeBenchHUDProps {
  isListening: boolean;
  isSupported: boolean;
  isSpeaking: boolean;
  isTtsEnabled: boolean;
  lastTranscript?: string;
  matchedCommand?: string | null;
  micPermissionDenied?: boolean;
  availableCommands: { phrase: string; action: string }[];
  onToggleListening: () => void;
  onToggleTts: () => void;
  onStopSpeaking?: () => void;
  onSimulateCommand?: (command: string) => void;
  benchContextTitle?: string;
}

export const HandsFreeBenchHUD: React.FC<HandsFreeBenchHUDProps> = ({
  isListening,
  isSupported,
  isSpeaking,
  isTtsEnabled,
  lastTranscript,
  matchedCommand,
  micPermissionDenied,
  availableCommands,
  onToggleListening,
  onToggleTts,
  onStopSpeaking,
  onSimulateCommand,
  benchContextTitle = "Hands-Free Bench Mode"
}) => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [manualInput, setManualInput] = useState('');

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    onSimulateCommand?.(manualInput.trim());
    setManualInput('');
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 shadow-md space-y-3 transition-all">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onToggleListening}
            className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
              isListening
                ? 'bg-rose-500 text-white shadow-rose-500/30 ring-2 ring-rose-400/50'
                : 'bg-cobalt-600 hover:bg-cobalt-500 text-white dark:bg-amber-400 dark:hover:bg-amber-300'
            }`}
            title={isListening ? "Pause Voice Listening" : "Start Hands-Free Voice Control"}
          >
            {isListening ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <Mic className="w-3.5 h-3.5 animate-pulse" />
                <span>Bench Mic Active</span>
              </>
            ) : (
              <>
                <Mic className="w-3.5 h-3.5 text-stone-950" />
                <span>🎙️ Enable Hands-Free Voice</span>
              </>
            )}
          </button>

          {/* Text-to-Speech Output Toggle */}
          <button
            type="button"
            onClick={onToggleTts}
            className={`p-1.5 px-2.5 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              isTtsEnabled
                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900'
                : 'bg-slate-50 dark:bg-slate-850 text-slate-400 border-slate-200 dark:border-slate-800'
            }`}
            title={isTtsEnabled ? "Mute Voice Audio Reader" : "Unmute Voice Audio Reader"}
          >
            {isTtsEnabled ? <Volume2 className="w-4 h-4 text-blue-600 dark:text-blue-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="text-[11px] hidden sm:inline">{isTtsEnabled ? 'Voice Reader On' : 'Muted'}</span>
          </button>

          {/* Speaking Waveform Indicator */}
          {isSpeaking && (
            <button 
              type="button"
              onClick={onStopSpeaking}
              className="cursor-pointer px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-mono flex items-center gap-1.5 animate-pulse"
              title="Click to stop reading"
            >
              <Volume2 className="w-3 h-3 text-emerald-500" />
              <span>Speaking... (click to silence)</span>
            </button>
          )}
        </div>

        {/* Bench Context & Quick Help Toggle */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden md:inline">
            {benchContextTitle}
          </span>
          <button
            type="button"
            onClick={() => setIsHelpOpen(!isHelpOpen)}
            className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>Voice Commands ({availableCommands.length})</span>
            {isHelpOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Mic Permission Warning / Not Supported Notice */}
      {!isSupported && (
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MicOff className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Web Speech API is running in simulated mode for this container. Use the instant voice command trigger buttons below!</span>
          </div>
        </div>
      )}

      {micPermissionDenied && isSupported && (
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MicOff className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Microphone is muted by browser policy. You can still trigger any voice command using the quick buttons below!</span>
          </div>
        </div>
      )}

      {/* Interactive Quick-Action Voice Command Chips */}
      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mr-1 flex items-center gap-1">
          <Play className="w-3 h-3 text-amber-500" /> Quick Voice Test:
        </span>
        {availableCommands.slice(0, 5).map((cmd, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onSimulateCommand?.(cmd.phrase.split('/')[0].trim())}
            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-amber-100 dark:bg-slate-800 dark:hover:bg-amber-950/40 text-slate-700 hover:text-amber-900 dark:text-slate-300 dark:hover:text-amber-300 border border-slate-200 dark:border-slate-700/60 text-[10px] font-medium transition-all active:scale-95 flex items-center gap-1"
            title={`Click to simulate voice command: "${cmd.phrase}"`}
          >
            <span className="text-amber-500">🗣️</span>
            <span>"{cmd.phrase}"</span>
          </button>
        ))}
      </div>

      {/* Live Transcript & Executed Command Feed */}
      {(isListening || lastTranscript || matchedCommand) && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/60 text-xs">
          <div className="flex items-center gap-2 max-w-full overflow-hidden">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 shrink-0">
              {isListening ? "Live Mic:" : "Last Voice Action:"}
            </span>
            <p className="text-slate-700 dark:text-slate-300 font-mono italic truncate text-[11px]">
              {lastTranscript ? `"${lastTranscript}"` : 'Listening for hands-free bench command...'}
            </p>
          </div>

          {matchedCommand && (
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold shrink-0 border border-emerald-300 dark:border-emerald-800 animate-bounce">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Executed: {matchedCommand}</span>
            </div>
          )}
        </div>
      )}

      {/* Collapsible Full Voice Commands Cheat Sheet with Manual Trigger */}
      {isHelpOpen && (
        <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
              Hands-Free Bench Voice Dictionary
            </span>
            <span className="text-[10px] text-slate-400">Click any card to trigger or speak into microphone</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
            {availableCommands.map((cmd, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSimulateCommand?.(cmd.phrase.split('/')[0].trim())}
                className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 hover:border-cobalt-400 dark:hover:border-cobalt-400 flex flex-col justify-between text-left transition-all hover:shadow-xs active:scale-[0.99] group cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 text-[11px]">
                    "{cmd.phrase}"
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 group-hover:text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Trigger ▶
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {cmd.action}
                </span>
              </button>
            ))}
          </div>

          {/* Direct Voice Input Tester */}
          <form onSubmit={handleManualSubmit} className="flex gap-2 pt-1 border-t border-slate-200 dark:border-slate-800">
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Test voice phrase (e.g. next step, pass, run diagnosis, read step)..."
              className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-cobalt-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-cobalt-600 hover:bg-cobalt-500 text-white font-bold text-xs flex items-center gap-1 transition-all"
            >
              <Send className="w-3 h-3" />
              <span>Test</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default HandsFreeBenchHUD;
