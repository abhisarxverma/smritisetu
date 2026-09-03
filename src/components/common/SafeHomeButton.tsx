'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, ShieldCheck, Heart } from 'lucide-react';
import { audioService } from '../../lib/audioService';

interface SafeHomeButtonProps {
  className?: string;
}

export default function SafeHomeButton({ className = '' }: SafeHomeButtonProps) {
  const { setCurrentView, resetSession, stopVoiceListening } = useApp();

  const handleSafeReturn = () => {
    // Stop all audio, recordings, and reset to calm safe state
    audioService.stopSpeech();
    stopVoiceListening();
    audioService.playGentleChime('rest');
    resetSession();
    setCurrentView('landing');
  };

  return (
    <button
      onClick={handleSafeReturn}
      aria-label="Home and Safe Button - Tap to return to the calm starting screen at any time"
      title="Safe & Home: Tap anytime to return to a calm screen"
      className={`fixed top-4 left-4 z-50 flex items-center space-x-2 px-5 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base sm:text-lg shadow-2xl shadow-amber-950/70 border-2 border-white ring-4 ring-amber-500/40 transform hover:scale-105 active:scale-95 transition-all cursor-pointer ${className}`}
    >
      <Home className="w-6 h-6 stroke-[3] text-slate-950" />
      <span className="tracking-wide uppercase font-sans">Home / Safe</span>
    </button>
  );
}
