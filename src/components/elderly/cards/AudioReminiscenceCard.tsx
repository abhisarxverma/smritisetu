'use client';

import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Play, Pause, Volume2, Sparkles } from 'lucide-react';
import { audioService } from '../../../lib/audioService';

interface AudioReminiscenceCardProps {
  onComplete?: () => void;
}

export default function AudioReminiscenceCard({ onComplete }: AudioReminiscenceCardProps) {
  const { speakPrompt, recordAttempt } = useApp();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [answered, setAnswered] = useState<string | null>(null);
  const [startTime] = useState<number>(Date.now());

  const promptText = "Which instrument guides the rhythm?";
  const promptAssamese = "কোনটো সুৰীয়া বাদ্য বাজিছে আইতা?";

  const playFolkMelody = () => {
    setIsPlaying(true);
    audioService.playGentleChime('success');

    setTimeout(() => {
      setIsPlaying(false);
    }, 4000);
  };

  const handleSelect = (instrument: 'dhol' | 'pepa') => {
    setAnswered(instrument);
    const latencyMs = Math.max(900, Date.now() - startTime);

    if (instrument === 'dhol') {
      audioService.playGentleChime('success');
      recordAttempt('recalled', Math.round(latencyMs / 1000), false, false);
    } else {
      audioService.playGentleChime('encouragement');
      recordAttempt('assisted', Math.round(latencyMs / 1000), false, false);
    }

    if (onComplete) {
      setTimeout(onComplete, 1600);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-8 py-4 bg-[#0a192f] text-white select-none">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center space-y-6 text-center">

        {/* Play Melody Circle */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <button
            onClick={playFolkMelody}
            aria-label={isPlaying ? 'Pause song' : 'Play regional folk song'}
            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center border-4 shadow-2xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer ${
              isPlaying
                ? 'bg-amber-400 border-white text-slate-950 ring-8 ring-amber-400/40 animate-pulse'
                : 'bg-gradient-to-tr from-amber-500 to-yellow-400 border-white text-slate-950 hover:bg-yellow-300'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-12 h-12 fill-slate-950" />
            ) : (
              <Play className="w-12 h-12 fill-slate-950 ml-1.5" />
            )}
          </button>

          <span className="text-base sm:text-lg font-bold text-yellow-300">
            {isPlaying ? '♪ Playing Regional Bihu Tune... ♪' : 'Tap to Play Regional Melody'}
          </span>

          {/* Equalizer Visualizer */}
          {isPlaying && (
            <div className="flex items-center justify-center space-x-1.5 h-6">
              <div className="w-1.5 h-6 bg-amber-400 rounded-full animate-bounce" />
              <div className="w-1.5 h-4 bg-yellow-300 rounded-full animate-bounce [animation-delay:0.15s]" />
              <div className="w-1.5 h-7 bg-amber-400 rounded-full animate-bounce [animation-delay:0.3s]" />
              <div className="w-1.5 h-3 bg-yellow-300 rounded-full animate-bounce [animation-delay:0.45s]" />
              <div className="w-1.5 h-5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            </div>
          )}
        </div>

        {/* Clear Question Heading */}
        <div className="space-y-1 px-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-white leading-tight">
            {promptText}
          </h2>
          <p className="text-lg sm:text-xl font-serif text-yellow-200">
            {promptAssamese}
          </p>
        </div>

        {/* Two Instrument Options */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <button
            onClick={() => handleSelect('dhol')}
            disabled={answered !== null}
            className={`min-h-[64px] sm:min-h-[72px] px-6 py-4 rounded-2xl font-black text-xl flex items-center justify-center space-x-3 border-2 transition-all transform active:scale-95 shadow-xl cursor-pointer ${
              answered === 'dhol'
                ? 'bg-emerald-500 border-white text-slate-950 ring-4 ring-emerald-400/40'
                : 'bg-slate-800 hover:bg-slate-750 border-amber-400 text-yellow-300'
            }`}
          >
            <span className="text-2xl">🥁</span>
            <span>Dhol (Drum)</span>
          </button>

          <button
            onClick={() => handleSelect('pepa')}
            disabled={answered !== null}
            className={`min-h-[64px] sm:min-h-[72px] px-6 py-4 rounded-2xl font-black text-xl flex items-center justify-center space-x-3 border-2 transition-all transform active:scale-95 shadow-xl cursor-pointer ${
              answered === 'pepa'
                ? 'bg-emerald-500 border-white text-slate-950 ring-4 ring-emerald-400/40'
                : 'bg-slate-800 hover:bg-slate-750 border-amber-400 text-yellow-300'
            }`}
          >
            <span className="text-2xl">🎺</span>
            <span>Pepa / Flute</span>
          </button>
        </div>

        {/* Feedback State */}
        {answered && (
          <div className="w-full p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-400 text-emerald-200 text-base font-bold text-center animate-fade-in flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Wonderful! The festive rhythm brings back sweet memories.</span>
          </div>
        )}

      </div>
    </div>
  );
}
