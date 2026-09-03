'use client';

import React from 'react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

interface DignifiedFeedbackProps {
  isVisible: boolean;
  message: string;
  subMessage?: string;
  isSuccess: boolean;
  onNext: () => void;
  nextButtonText?: string;
}

export default function DignifiedFeedback({
  isVisible,
  message,
  subMessage,
  isSuccess,
  onNext,
  nextButtonText = 'Continue to Next Activity'
}: DignifiedFeedbackProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-fade-in">
      <div
        className={`max-w-md w-full rounded-3xl p-6 sm:p-8 text-center shadow-2xl border transition-all transform animate-scale-up ${
          isSuccess
            ? 'bg-gradient-to-b from-stone-900 to-stone-950 border-amber-500/40 text-stone-100'
            : 'bg-gradient-to-b from-stone-900 to-stone-950 border-teal-500/40 text-stone-100'
        }`}
      >
        {/* Dignified Visual Icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${
              isSuccess
                ? 'bg-gradient-to-tr from-amber-500 to-rose-500 text-white shadow-amber-900/40 animate-pulse'
                : 'bg-gradient-to-tr from-teal-600 to-emerald-500 text-white shadow-teal-900/40'
            }`}
          >
            {isSuccess ? (
              <Sparkles className="w-10 h-10 stroke-[2.5]" />
            ) : (
              <Heart className="w-10 h-10 fill-white/80" />
            )}
          </div>
        </div>

        {/* Affirming, respectful title */}
        <h3 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight mb-2 text-stone-50">
          {message}
        </h3>

        {/* Gentle supportive context */}
        {subMessage && (
          <p className="text-base sm:text-lg text-stone-300 mb-6 font-light leading-relaxed">
            {subMessage}
          </p>
        )}

        {/* Large, high-contrast action button */}
        <button
          onClick={onNext}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-lg sm:text-xl shadow-lg shadow-amber-950/40 flex items-center justify-center space-x-3 transition-all hover:scale-[1.02] active:scale-[0.98] border border-amber-300/40 focus:outline-none focus:ring-4 focus:ring-amber-500/50"
        >
          <span>{nextButtonText}</span>
          <ArrowRight className="w-6 h-6 stroke-[3]" />
        </button>

        <p className="text-xs text-stone-400 mt-4 tracking-wide">
          Take all the time you need • Preserving memories with dignity
        </p>
      </div>
    </div>
  );
}
