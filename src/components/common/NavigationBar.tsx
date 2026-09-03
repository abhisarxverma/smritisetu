'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageCode } from '../../data/types';
import {
  Heart,
  Home,
  Users,
  Stethoscope,
  BookOpen,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Sparkles
} from 'lucide-react';

export default function NavigationBar() {
  const {
    currentView,
    setCurrentView,
    language,
    setLanguage,
    isOffline,
    toggleOfflineMode,
    isAudioMuted,
    toggleAudioMute
  } = useApp();

  // In elderly patient mode, PacedReminiscenceStream provides its own integrated, distraction-free top bar
  if (currentView === 'elderly') {
    return null;
  }

  // Standard Clean Desktop / Tablet Header for Caregiver, Clinician & Landing
  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Wordmark */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentView('landing')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-rose-600 flex items-center justify-center shadow-md">
              <Heart className="w-5 h-5 text-white fill-white/80" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                SmritiSetu
              </span>
              <span className="text-xs text-amber-400 font-serif hidden sm:inline">
                স্মৃতি সেতু
              </span>
            </div>
          </div>

          {/* Clean Segmented Navigation */}
          <nav className="hidden md:flex items-center space-x-1 p-1 bg-stone-900 rounded-2xl border border-stone-800">
            <button
              onClick={() => setCurrentView('landing')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                currentView === 'landing'
                  ? 'bg-stone-800 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Story & Vision
            </button>

            <button
              onClick={() => setCurrentView('elderly')}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 text-amber-300 hover:text-white"
            >
              <Heart className="w-3.5 h-3.5 fill-amber-300/40 text-amber-300" />
              <span>Patient Stream</span>
            </button>

            <button
              onClick={() => setCurrentView('caregiver')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                currentView === 'caregiver'
                  ? 'bg-teal-700 text-white shadow'
                  : 'text-teal-300 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-teal-300" />
              <span>Caregiver & ASHA</span>
            </button>

            <button
              onClick={() => setCurrentView('clinician')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                currentView === 'clinician'
                  ? 'bg-indigo-700 text-white shadow'
                  : 'text-indigo-300 hover:text-white'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 text-indigo-300" />
              <span>Clinician</span>
            </button>

            <button
              onClick={() => setCurrentView('research')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                currentView === 'research'
                  ? 'bg-stone-800 text-white shadow'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Research</span>
            </button>
          </nav>

          {/* Right Utility Cluster */}
          <div className="flex items-center space-x-2.5">
            {/* Language Selection Pill */}
            <select
              aria-label="Language Selector"
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="bg-stone-900 border border-stone-800 text-stone-200 text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium cursor-pointer"
            >
              <option value="en">English</option>
              <option value="as">অসমীয়া</option>
              <option value="hi">हिन्दी</option>
              <option value="bodo">बड़ो</option>
            </select>

            {/* Offline Simulation Button */}
            <button
              onClick={toggleOfflineMode}
              aria-label="Toggle Offline Simulation"
              title={isOffline ? 'Offline Mode Active' : 'Connected to Cloud'}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isOffline
                  ? 'bg-amber-950/80 border-amber-600 text-amber-300 animate-pulse'
                  : 'bg-stone-900 border-stone-800 text-emerald-400 hover:bg-stone-850'
              }`}
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isOffline ? 'Offline' : 'Online'}</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleAudioMute}
              aria-label="Toggle Audio Feedback"
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-colors cursor-pointer"
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className="md:hidden flex items-center justify-between py-2 border-t border-stone-800/80 text-xs">
          <button
            onClick={() => setCurrentView('landing')}
            className={`px-2 py-1 rounded ${currentView === 'landing' ? 'text-amber-400 font-bold' : 'text-stone-400'}`}
          >
            Story
          </button>
          <button
            onClick={() => setCurrentView('elderly')}
            className="px-2 py-1 rounded text-stone-400"
          >
            Patient Feed
          </button>
          <button
            onClick={() => setCurrentView('caregiver')}
            className={`px-2 py-1 rounded ${currentView === 'caregiver' ? 'text-teal-400 font-bold' : 'text-stone-400'}`}
          >
            Caregiver
          </button>
          <button
            onClick={() => setCurrentView('clinician')}
            className={`px-2 py-1 rounded ${currentView === 'clinician' ? 'text-indigo-400 font-bold' : 'text-stone-400'}`}
          >
            Clinician
          </button>
          <button
            onClick={() => setCurrentView('research')}
            className={`px-2 py-1 rounded ${currentView === 'research' ? 'text-amber-300 font-bold' : 'text-stone-400'}`}
          >
            Research
          </button>
        </div>
      </div>
    </header>
  );
}
