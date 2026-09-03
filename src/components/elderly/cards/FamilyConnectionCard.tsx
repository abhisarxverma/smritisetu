'use client';

import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { PhoneCall, Volume2, Heart } from 'lucide-react';
import { audioService } from '../../../lib/audioService';

interface FamilyConnectionCardProps {
  onComplete?: () => void;
}

export default function FamilyConnectionCard({ onComplete }: FamilyConnectionCardProps) {
  const { speakPrompt, recordAttempt } = useApp();
  const [isCallingModalOpen, setIsCallingModalOpen] = useState<boolean>(false);
  const [callConnected, setCallConnected] = useState<boolean>(false);

  const sonName = "Debashish Baruah (Son)";
  const location = "Guwahati / Tezpur";
  const promptQuestion = "Here is your son Debashish. Would you like to call him?";
  const promptAssamese = "আপোনাৰ পুত্ৰ দেবাশীষ। তেওঁলৈ ফোন কৰিব নেকি আইতা?";

  const handleCall = () => {
    audioService.playGentleChime('success');
    setIsCallingModalOpen(true);
    setCallConnected(false);

    setTimeout(() => {
      setCallConnected(true);
      speakPrompt("Connected to Debashish. He says: Pranam Aita, how is your morning in Tezpur?");
    }, 2000);

    recordAttempt('recalled', 2, true, false);

    if (onComplete) {
      setTimeout(onComplete, 3000);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-8 py-4 bg-[#0a192f] text-white select-none">
      <div className="w-full max-w-xl mx-auto flex flex-col items-center space-y-5 text-center">

        {/* Family Member Photograph */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden border-4 border-rose-400/80 shadow-2xl bg-black">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
            alt="Debashish Baruah Son"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 inset-x-2 px-2 py-1 rounded-full bg-slate-950/80 text-xs font-bold text-rose-300 border border-rose-400/40">
            {sonName}
          </div>
          <button
            onClick={() => speakPrompt(`${promptQuestion} ${promptAssamese}`)}
            aria-label="Listen to question spoken aloud"
            className="absolute top-2 right-2 p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-rose-400/60 text-yellow-300 transition-transform active:scale-90 cursor-pointer shadow-lg"
            title="Listen aloud"
          >
            <Volume2 className="w-4 h-4 text-yellow-300" />
          </button>
        </div>

        {/* Clear Question Heading */}
        <div className="space-y-1 px-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-yellow-300 leading-tight">
            {promptQuestion}
          </h2>
          <p className="text-lg sm:text-xl font-serif text-slate-300">
            {promptAssamese}
          </p>
        </div>

        {/* Massive Call Button */}
        <div className="w-full pt-1">
          <button
            onClick={handleCall}
            className="w-full min-h-[68px] sm:min-h-[76px] px-6 py-4 rounded-2xl font-black text-2xl flex items-center justify-center space-x-3 bg-emerald-600 hover:bg-emerald-500 border-2 border-emerald-300 text-white shadow-xl transform active:scale-95 transition-all cursor-pointer ring-4 ring-emerald-500/30"
          >
            <PhoneCall className="w-7 h-7 stroke-[3] animate-bounce" />
            <span>CALL SON (দেবাশীষ)</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-400">
          Tap above to speak with family • Safe and supported
        </p>

      </div>

      {/* Empathetic Simulated Call Modal */}
      {isCallingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0a192f] border-2 border-emerald-400 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl space-y-5">
            <div className="w-20 h-20 rounded-full border-2 border-emerald-400 overflow-hidden mx-auto shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                alt="Debashish"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl font-serif font-bold text-white mb-0.5">
                {sonName}
              </h3>
              <p className="text-emerald-300 text-base font-bold font-mono">
                {callConnected ? "● Connected • Speaking" : "Calling Son in Guwahati..."}
              </p>
            </div>

            {callConnected ? (
              <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-400 text-emerald-200 text-sm leading-relaxed">
                “প্রণাম আইতা! মই দেবাশীষ। আপুনি পুৱা চাহ খালে নে? (Pranam Aita, this is Debashish. How are you feeling?)”
              </div>
            ) : (
              <div className="flex justify-center py-2">
                <div className="w-7 h-7 rounded-full border-3 border-emerald-400 border-t-transparent animate-spin" />
              </div>
            )}

            <button
              onClick={() => {
                audioService.stopSpeech();
                setIsCallingModalOpen(false);
              }}
              className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-base border border-white shadow transition-colors cursor-pointer"
            >
              End Call & Return
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
