'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../data/translations';
import { Heart, Volume2, VolumeX, PhoneCall, Clock, Sparkles } from 'lucide-react';

export default function ElderlyHeader() {
  const {
    patient,
    language,
    sessionSeconds,
    sessionLimitMinutes,
    isAudioMuted,
    toggleAudioMute,
    completeSession
  } = useApp();

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const elapsedMinutes = Math.floor(sessionSeconds / 60);

  return (
    <div className="w-full bg-stone-900 text-stone-100 rounded-3xl p-5 sm:p-6 shadow-xl border border-stone-800 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Dignified Personal Greeting */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-rose-600 p-0.5 shadow-lg shadow-amber-900/30 flex items-center justify-center shrink-0">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
              alt={patient.name}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-amber-200">
                {t.greetingAita}
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-500/20 text-rose-300 border border-rose-500/30">
                <Heart className="w-3 h-3 mr-1 fill-rose-300" />
                {patient.location}
              </span>
            </div>
            <p className="text-sm sm:text-base text-stone-300 mt-0.5">
              {t.readyPrompt}
            </p>
          </div>
        </div>

        {/* Mindful Session Bounded Pacing & Quick Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Gentle Duration Pill */}
          <div className="flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-stone-800/90 border border-stone-700/80 text-xs sm:text-sm">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-stone-300">Session:</span>
            <span className="font-mono font-bold text-amber-300">
              {elapsedMinutes} / {sessionLimitMinutes} min
            </span>
          </div>

          {/* Audio Instruction Toggle */}
          <button
            onClick={toggleAudioMute}
            aria-label="Toggle spoken audio guidance"
            className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs sm:text-sm font-medium transition-colors"
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-rose-400" />
                <span>Audio Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Audio On</span>
              </>
            )}
          </button>

          {/* Quick Caregiver Connection */}
          <button
            onClick={() => alert(`Connecting voice call to daughter ${patient.familyCaregiverName} in Tezpur/Guwahati...`)}
            aria-label="Call family caregiver"
            className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Sunita</span>
          </button>

          {/* Gentle Session Finish */}
          <button
            onClick={completeSession}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium border border-stone-700 transition-colors"
          >
            <span>Finish for Today</span>
          </button>
        </div>
      </div>
    </div>
  );
}
