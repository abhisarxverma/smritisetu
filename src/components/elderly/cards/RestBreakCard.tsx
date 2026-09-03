'use client';

import React, { useState, useEffect } from 'react';
import { FeedActivity } from '../../../data/types';
import { useApp } from '../../../context/AppContext';
import { TRANSLATIONS } from '../../../data/translations';
import { Volume2, Sparkles, Wind, CheckCircle2, ArrowRight } from 'lucide-react';

interface RestBreakCardProps {
  activity: FeedActivity;
}

export default function RestBreakCard({ activity }: RestBreakCardProps) {
  const {
    language,
    completeSession,
    advanceToNextActivity,
    speakPrompt,
    fontSizeScale
  } = useApp();

  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const promptText =
    language === 'as' && activity.promptTextAssamese
      ? activity.promptTextAssamese
      : language === 'hi' && activity.promptTextHindi
      ? activity.promptTextHindi
      : activity.promptText;

  // Gentle 12-second mindful breathing cycle
  useEffect(() => {
    const cycle = setInterval(() => {
      setBreathPhase(prev => (prev === 'Inhale' ? 'Hold' : prev === 'Hold' ? 'Exhale' : 'Inhale'));
    }, 4000);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div className="bg-stone-900/95 text-stone-100 rounded-3xl p-6 sm:p-10 shadow-2xl border border-teal-800/60 backdrop-blur-sm max-w-3xl mx-auto text-center">
      {/* Rest Badge */}
      <div className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/40 mb-6">
        <Wind className="w-4 h-4 text-teal-400" />
        <span>Bounded Mindful Rest & River Breeze Pause</span>
      </div>

      <h2
        style={{ fontSize: `${1.45 * fontSizeScale}rem` }}
        className="font-serif font-bold text-stone-50 leading-relaxed mb-4"
      >
        {promptText}
      </h2>

      <p className="text-stone-300 text-sm sm:text-base max-w-lg mx-auto mb-8 font-light">
        {t.takeABreakSubtitle}
      </p>

      {/* Gentle Animated Breathing Circle */}
      <div className="flex flex-col items-center justify-center my-8">
        <div
          className={`w-36 h-36 rounded-full flex items-center justify-center border-4 border-teal-400/50 shadow-2xl transition-all duration-3000 ${
            breathPhase === 'Inhale'
              ? 'scale-115 bg-teal-800/40 shadow-teal-500/30'
              : breathPhase === 'Hold'
              ? 'scale-115 bg-teal-700/50 shadow-teal-400/40'
              : 'scale-90 bg-teal-900/30 shadow-teal-900/20'
          }`}
        >
          <div className="text-center">
            <span className="text-lg font-bold text-teal-200 uppercase tracking-widest block font-mono">
              {breathPhase}
            </span>
            <span className="text-[11px] text-teal-300/80">Gentle Breath</span>
          </div>
        </div>
        <p className="text-xs text-stone-400 mt-4 italic">
          Breathe with the peaceful flow of the Brahmaputra River
        </p>
      </div>

      {/* Choice Buttons: Finish Session or Continue */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-6 border-t border-stone-800">
        <button
          onClick={completeSession}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-base sm:text-lg shadow-lg shadow-teal-950/40 transition-all flex items-center justify-center space-x-2"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{t.finishSessionButton}</span>
        </button>

        <button
          onClick={advanceToNextActivity}
          className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium text-sm sm:text-base border border-stone-700 transition-colors flex items-center justify-center space-x-2"
        >
          <span>One More Gentle Activity</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
