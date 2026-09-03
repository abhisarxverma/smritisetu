'use client';

import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Volume2, CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { audioService } from '../../../lib/audioService';

interface VisualMemoryMatchCardProps {
  onComplete?: () => void;
}

export default function VisualMemoryMatchCard({ onComplete }: VisualMemoryMatchCardProps) {
  const { speakPrompt, recordAttempt } = useApp();
  const [answered, setAnswered] = useState<'yes' | 'no' | null>(null);
  const [startTime] = useState<number>(Date.now());

  const promptQuestion = "Have you visited Majuli Island along the Brahmaputra River?";
  const promptAssamese = "আপুনি ব্ৰহ্মপুত্ৰৰ মাজুলী নদীদ্বীপলৈ গৈ পাইছে নে?";

  const handleAnswer = (choice: 'yes' | 'no') => {
    setAnswered(choice);
    const latencyMs = Math.max(800, Date.now() - startTime);

    if (choice === 'yes') {
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
      <div className="w-full max-w-xl mx-auto flex flex-col items-center space-y-5">
        
        {/* Landmark Image with Vintage Filter */}
        <div className="relative w-full rounded-3xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-black aspect-[16/10] max-h-[34vh]">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
            alt="Majuli Island scenic landscape"
            className="w-full h-full object-cover filter sepia-[0.2] contrast-105"
          />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-sm border border-amber-400/40 text-xs font-semibold text-amber-300 flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Majuli River Island • Assam</span>
          </div>
          <button
            onClick={() => speakPrompt(`${promptQuestion} ${promptAssamese}`)}
            aria-label="Listen to question spoken aloud"
            className="absolute top-3 right-3 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-amber-400/60 text-yellow-300 transition-transform active:scale-90 cursor-pointer shadow-lg"
            title="Listen aloud"
          >
            <Volume2 className="w-5 h-5 text-yellow-300" />
          </button>
        </div>

        {/* Question Header (Clean, High Contrast) */}
        <div className="text-center space-y-1.5 px-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-yellow-300 leading-tight">
            {promptQuestion}
          </h2>
          <p className="text-lg sm:text-xl font-serif text-slate-300">
            {promptAssamese}
          </p>
        </div>

        {/* Two Massive, Evenly Spaced Action Buttons (Min 64px height) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <button
            onClick={() => handleAnswer('yes')}
            disabled={answered !== null}
            className={`min-h-[64px] sm:min-h-[72px] px-6 py-4 rounded-2xl font-black text-xl flex items-center justify-center space-x-2 border-2 transition-all transform active:scale-95 shadow-xl cursor-pointer ${
              answered === 'yes'
                ? 'bg-emerald-500 border-white text-slate-950 ring-4 ring-emerald-400/40'
                : 'bg-emerald-600 hover:bg-emerald-500 border-emerald-300 text-white'
            }`}
          >
            <CheckCircle2 className="w-6 h-6 stroke-[3]" />
            <span>YES, I HAVE</span>
          </button>

          <button
            onClick={() => handleAnswer('no')}
            disabled={answered !== null}
            className={`min-h-[64px] sm:min-h-[72px] px-6 py-4 rounded-2xl font-black text-xl flex items-center justify-center space-x-2 border-2 transition-all transform active:scale-95 shadow-xl cursor-pointer ${
              answered === 'no'
                ? 'bg-amber-400 border-white text-slate-950 ring-4 ring-amber-300/40'
                : 'bg-slate-800 hover:bg-slate-700 border-amber-400 text-yellow-300'
            }`}
          >
            <span>NOT YET</span>
          </button>
        </div>

        {/* Dignified Feedback Toast */}
        {answered && (
          <div className="w-full p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-400 text-emerald-200 text-base font-bold text-center animate-fade-in flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>
              {answered === 'yes'
                ? 'Wonderful memory of Majuli! Peaceful thoughts.'
                : 'Thank you, Aita. Majuli is always near in our stories.'}
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
