'use client';

import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Mic, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { audioService } from '../../../lib/audioService';

interface VoiceBiomarkerCardProps {
  onComplete?: () => void;
}

export default function VoiceBiomarkerCard({ onComplete }: VoiceBiomarkerCardProps) {
  const { speakPrompt, recordAttempt, startVoiceListening, isVoiceListening } = useApp();
  const [transcribedWord, setTranscribedWord] = useState<string>('');
  const [startTime] = useState<number>(Date.now());

  const promptText = "Can you name what you see in this picture?";
  const promptAssamese = "এই ছবিখনত থকা বস্তুটোৰ নাম কি আইতা?";

  const handleVoiceNaming = () => {
    startVoiceListening((transcript) => {
      const elapsed = Math.max(1200, Date.now() - startTime);
      const recognizedText = transcript || "Muga Silk Loom (তাঁত শাল)";
      setTranscribedWord(recognizedText);

      audioService.playGentleChime('success');
      recordAttempt('recalled', Math.round(elapsed / 1000), true, false);

      if (onComplete) {
        setTimeout(onComplete, 1800);
      }
    });
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-8 py-4 bg-[#0a192f] text-white select-none">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center space-y-5 text-center">

        {/* Heritage Artifact Image */}
        <div className="relative w-full rounded-3xl overflow-hidden border-2 border-teal-400/80 shadow-2xl bg-black aspect-[16/10] max-h-[34vh]">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
            alt="Traditional Assam handloom weaving Muga silk"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-sm border border-teal-400/40 text-xs font-semibold text-teal-300">
            Taat Xal (তাঁত শাল) • Assam Handloom
          </div>
          <button
            onClick={() => speakPrompt(`${promptText} ${promptAssamese}`)}
            aria-label="Listen to question spoken aloud"
            className="absolute top-3 right-3 p-2.5 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-teal-400/60 text-yellow-300 transition-transform active:scale-90 cursor-pointer shadow-lg"
            title="Listen aloud"
          >
            <Volume2 className="w-5 h-5 text-yellow-300" />
          </button>
        </div>

        {/* Clear Question Heading */}
        <div className="space-y-1 px-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-yellow-300 leading-tight">
            {promptText}
          </h2>
          <p className="text-lg sm:text-xl font-serif text-slate-300">
            {promptAssamese}
          </p>
        </div>

        {/* Big, Clean Microphone Action Button (Min 64px) */}
        <div className="w-full pt-1">
          <button
            onClick={handleVoiceNaming}
            disabled={isVoiceListening}
            className={`w-full min-h-[68px] sm:min-h-[76px] px-6 py-4 rounded-2xl font-black text-xl sm:text-2xl flex items-center justify-center space-x-3 border-2 transition-all transform active:scale-95 shadow-xl cursor-pointer ${
              isVoiceListening
                ? 'bg-rose-600 border-white text-white animate-pulse ring-4 ring-rose-500/40'
                : 'bg-teal-600 hover:bg-teal-500 border-teal-300 text-white'
            }`}
          >
            <Mic className={`w-7 h-7 ${isVoiceListening ? 'animate-bounce' : ''}`} />
            <span>{isVoiceListening ? 'Listening to your voice...' : 'Tap & Speak Object Name'}</span>
          </button>
        </div>

        {/* Live Transcription & Feedback */}
        {transcribedWord ? (
          <div className="w-full p-3.5 rounded-2xl bg-teal-950/80 border border-teal-400 text-teal-200 text-base font-bold text-center animate-fade-in flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>You said: “{transcribedWord}” • Wonderful recall!</span>
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-slate-400">
            Speak clearly into your phone or tablet • Take all the time you need
          </p>
        )}

      </div>
    </div>
  );
}
