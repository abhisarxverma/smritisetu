'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Brain,
  MessageSquare,
  Sliders,
  ShieldAlert,
  Sparkles,
  Plus
} from 'lucide-react';

export default function CaregiverOverview() {
  const {
    patient,
    cognitiveProfile,
    sessionLimitMinutes,
    setSessionLimitMinutes,
    caregiverObservations,
    addCaregiverObservation,
    attempts,
    sessionSeconds
  } = useApp();

  const [newNote, setNewNote] = useState('');
  const [flagNotice, setFlagNotice] = useState(false);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addCaregiverObservation(newNote.trim(), flagNotice);
    setNewNote('');
    setFlagNotice(false);
  };

  const domainList = Object.entries(cognitiveProfile.domains);

  return (
    <div className="space-y-8">
      {/* Top Daily Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
            <span>Today's Engagement</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-amber-300">
            {Math.floor(sessionSeconds / 60) || cognitiveProfile.todaySessionMinutes}m
            <span className="text-xs font-normal text-stone-400 ml-1">/ {sessionLimitMinutes}m cap</span>
          </div>
          <p className="text-[11px] text-emerald-400 mt-2 flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Bounded within healthy limits
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
            <span>Activities Completed</span>
            <Brain className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-teal-300">
            {cognitiveProfile.todayActivitiesCompleted || 7}
          </div>
          <p className="text-[11px] text-stone-400 mt-2">
            Balanced across 5 cognitive domains
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
            <span>Hesitation Index</span>
            <TrendingUp className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-rose-300">
            {cognitiveProfile.hesitationIndexAverage}s
          </div>
          <p className="text-[11px] text-stone-400 mt-2">
            Average response time before answer
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 shadow-lg">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
            <span>Caregiver Setting</span>
            <Sliders className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-sm font-semibold text-stone-200">
            Daily Cap: {sessionLimitMinutes} mins
          </div>
          <div className="flex items-center space-x-2 mt-2">
            {[10, 15, 20].map((mins) => (
              <button
                key={mins}
                onClick={() => setSessionLimitMinutes(mins)}
                className={`px-2 py-0.5 rounded text-xs font-mono font-semibold transition-colors ${
                  sessionLimitMinutes === mins
                    ? 'bg-amber-600 text-stone-950'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Daily Summary Banner (Non-Diagnostic) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-teal-950/40 to-stone-900 border border-teal-700/50 shadow-xl">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-serif font-bold text-lg text-teal-200">
                AI Cognitive Activity Synthesis for Sunita (Daughter)
              </h3>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-teal-900/60 text-teal-300 font-semibold border border-teal-700/60">
                Non-Diagnostic Caregiver Brief
              </span>
            </div>
            <p className="text-sm text-stone-200 leading-relaxed font-light">
              “Aita completed {cognitiveProfile.todayActivitiesCompleted || 7} activities today with warm emotional spirits. Autobiographical photo recall of her sister Minati was immediate and sparked spontaneous humming of Bihu melodies. Orientation tasks showed mild hesitation (3.8s) compared to baseline, which the adaptive feed gently scaffolded with sunrise cues. No signs of fatigue were triggered before the bounded rest pause.”
            </p>
            <p className="text-[11px] text-stone-400 mt-2.5 italic">
              * Note: This telemetry is designed solely for supportive family engagement and caregiver awareness. It is not an automated medical diagnosis.
            </p>
          </div>
        </div>
      </div>

      {/* Domain Performance & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Domain-wise Indicators */}
        <div className="bg-stone-900/90 rounded-3xl p-6 border border-stone-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-lg text-stone-100">
              Cognitive Engagement Indicators
            </h3>
            <span className="text-xs text-stone-400">Baseline Target: 70+</span>
          </div>

          <div className="space-y-4">
            {domainList.map(([domainKey, data]) => {
              const domainName = domainKey.replace('_', ' ').toUpperCase();
              return (
                <div key={domainKey} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-300 tracking-wide">
                      {domainName}
                    </span>
                    <div className="flex items-center space-x-2 font-mono">
                      <span className="text-stone-100 font-bold">{data.score}%</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          data.trend === 'improving'
                            ? 'bg-emerald-950 text-emerald-300'
                            : data.trend === 'soft_change'
                            ? 'bg-amber-950 text-amber-300'
                            : 'bg-stone-800 text-stone-300'
                        }`}
                      >
                        {data.trend}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-2.5 rounded-full bg-stone-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        data.score >= 80
                          ? 'bg-emerald-500'
                          : data.score >= 65
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${data.score}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Caregiver Observation Log */}
        <div className="bg-stone-900/90 rounded-3xl p-6 border border-stone-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-teal-400" />
                <h3 className="font-serif font-bold text-lg text-stone-100">
                  Family Observations Log
                </h3>
              </div>
              <span className="text-xs text-stone-400">
                Shared with Dr. Bhupen Sarma
              </span>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {caregiverObservations.map((obs) => (
                <div
                  key={obs.id}
                  className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
                    obs.flagChange
                      ? 'bg-amber-950/30 border-amber-800/50 text-amber-100'
                      : 'bg-stone-800/60 border-stone-700/60 text-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-stone-400 mb-1">
                    <span className="font-semibold text-stone-300">{obs.author}</span>
                    <span>{obs.timestamp}</span>
                  </div>
                  <p>{obs.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Note Input Form */}
          <form onSubmit={handleAddNote} className="mt-4 pt-4 border-t border-stone-800">
            <div className="flex flex-col space-y-2">
              <textarea
                rows={2}
                placeholder="Add an observation about Aita's mood, sleep, or recognition..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-800 border border-stone-700 text-xs text-stone-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-1.5 text-xs text-stone-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flagNotice}
                    onChange={(e) => setFlagNotice(e.target.checked)}
                    className="rounded border-stone-700 text-amber-600 focus:ring-amber-500 bg-stone-800"
                  />
                  <span>Flag subtle change for clinician</span>
                </label>

                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-colors flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Log Note</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
