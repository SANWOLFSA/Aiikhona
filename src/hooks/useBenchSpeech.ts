import { useState, useEffect, useRef, useCallback } from 'react';

// SpeechRecognition typing fallback for browser environments
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export interface VoiceCommand {
  keywords: string[];
  description: string;
  action: (transcript: string) => void;
}

export interface UseBenchSpeechOptions {
  commands?: VoiceCommand[];
  autoStart?: boolean;
  onTranscript?: (transcript: string) => void;
}

// Synthetic Audio Beep generator for bench hands-free feedback
export function playBenchBeep(type: 'listen_start' | 'listen_stop' | 'command_match' | 'pass' | 'fail' | 'step') {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'listen_start') {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'listen_stop') {
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'command_match') {
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.08); // A5
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'pass') {
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'fail') {
      osc.frequency.setValueAtTime(370, now);
      osc.frequency.setValueAtTime(311.13, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'step') {
      osc.frequency.setValueAtTime(700, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  } catch {
    // Audio context may be restricted by autoplay policy
  }
}

// Standalone SpeechSynthesis trigger helper
export function speakBenchText(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.cancel();
    const cleanText = text
      .replace(/[*#_`>]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .trim();
    if (!cleanText) return;
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';
    
    const assignVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('English')));
      if (naturalVoice) utterance.voice = naturalVoice;
    };

    assignVoice();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = assignVoice;
    }

    if (onEnd) utterance.onend = () => onEnd();
    window.speechSynthesis.speak(utterance);
  } catch {
    // Ignore browser speech failures
  }
}

export function useBenchSpeech(options: UseBenchSpeechOptions = {}) {
  const { commands = [], onTranscript } = options;
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [lastTranscript, setLastTranscript] = useState('');
  const [matchedCommand, setMatchedCommand] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [micPermissionDenied, setMicPermissionDenied] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(true);

  const recognitionRef = useRef<any>(null);
  const shouldListenRef = useRef(false);
  const commandsRef = useRef<VoiceCommand[]>(commands);
  commandsRef.current = commands;

  // Execute a command by text (either from speech recognition or simulated click/type)
  const executeVoiceCommandText = useCallback((text: string) => {
    const activeText = text.trim().toLowerCase();
    if (!activeText) return false;

    setLastTranscript(activeText);
    onTranscript?.(activeText);

    for (const cmd of commandsRef.current) {
      const matches = cmd.keywords.some(k => {
        const lowerK = k.toLowerCase();
        return activeText.includes(lowerK) || lowerK.includes(activeText);
      });

      if (matches) {
        setMatchedCommand(cmd.description);
        playBenchBeep('command_match');
        cmd.action(activeText);

        setTimeout(() => {
          setMatchedCommand(prev => prev === cmd.description ? null : prev);
        }, 2500);
        return true;
      }
    }
    return false;
  }, [onTranscript]);

  // Check Web Speech API support
  useEffect(() => {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 3;

      recognition.onstart = () => {
        setIsListening(true);
        setMicPermissionDenied(false);
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalTranscript += item[0].transcript;
          } else {
            interimTranscript += item[0].transcript;
          }
        }

        const activeText = (finalTranscript || interimTranscript).trim().toLowerCase();
        if (activeText) {
          executeVoiceCommandText(activeText);
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setMicPermissionDenied(true);
          setIsListening(false);
          shouldListenRef.current = false;
        }
      };

      recognition.onend = () => {
        if (shouldListenRef.current) {
          try {
            recognition.start();
          } catch {
            setIsListening(false);
          }
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
    } catch {
      setIsSupported(false);
    }

    return () => {
      shouldListenRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [executeVoiceCommandText]);

  // Start Voice Listening with mediaDevices permission trigger
  const startListening = useCallback(async () => {
    shouldListenRef.current = true;
    
    // Explicitly prompt for mic permissions if supported
    if (navigator?.mediaDevices?.getUserMedia) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setMicPermissionDenied(false);
      } catch {
        setMicPermissionDenied(true);
      }
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        playBenchBeep('listen_start');
        setIsListening(true);
      } catch {
        // already started or transitioning
        setIsListening(true);
      }
    }
  }, []);

  // Stop Voice Listening
  const stopListening = useCallback(() => {
    shouldListenRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        playBenchBeep('listen_stop');
      } catch {
        // ignore
      }
    }
    setIsListening(false);
  }, []);

  // Toggle Voice Listening
  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Speak text out loud via SpeechSynthesis
  const speakText = useCallback((text: string, onEnd?: () => void) => {
    if (!isTtsEnabled) return;
    speakBenchText(text, onEnd);
  }, [isTtsEnabled]);

  // Stop speech synthesis immediately
  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  return {
    isListening,
    isSupported,
    lastTranscript,
    matchedCommand,
    isSpeaking,
    isTtsEnabled,
    setIsTtsEnabled,
    micPermissionDenied,
    startListening,
    stopListening,
    toggleListening,
    speakText,
    stopSpeaking,
    simulateVoiceCommand: executeVoiceCommandText
  };
}
