'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { TRANSLATIONS } from '../../data/translations';
import { LanguageCode } from '../../data/types';
import {
  Heart,
  Users,
  Stethoscope,
  BookOpen,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Sparkles,
  Home,
  ShieldCheck
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
    toggleAudioMute,
    sessionSeconds,
    fontSizeScale,
    setFontSizeScale,
    syncQueue
  } = useApp();

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const elapsedMins = Math.floor(sessionSeconds / 60);

  return (
    <header className="sticky top-0 z-50 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo & Cultural Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-rose-600 flex items-center justify-center shadow-lg shadow-amber-900/30">
              <Heart className="w-6 h-6 text-white fill-white/80" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-white font-serif">SmritiSetu</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30">
                  স্মৃতি সেতু
                </span>
                <span className="hidden md:inline-block text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  NER SIH 2026
                </span>
              </div>
              <p className="text-xs text-stone-400 hidden sm:block">
                AI Cognitive Companion & Therapeutic Stream • North-East India
              </p>
            </div>
          </div>

          {/* Role Navigation Switcher */}
          <nav className="hidden lg:flex items-center space-x-1 p-1 bg-stone-800/80 rounded-xl border border-stone-700/60">
            <button
              onClick={() => setCurrentView('landing')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                currentView === 'landing'
                  ? 'bg-stone-700 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/40'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Platform Story</span>
            </button>

            <button
              onClick={() => setCurrentView('elderly')}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'elderly'
                  ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-md shadow-amber-900/30 ring-1 ring-amber-400/40'
                  : 'text-amber-300 hover:bg-amber-950/40'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300/40" />
              <span>Aita Mode (Elderly Feed)</span>
              {currentView === 'elderly' && (
                <span className="ml-1 px-1.5 py-0.2 bg-white/20 rounded text-[10px] font-mono">
                  {elapsedMins}m
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentView('caregiver')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                currentView === 'caregiver'
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'text-teal-300 hover:text-white hover:bg-teal-950/40'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-teal-300" />
              <span>Caregiver Sanctuary</span>
            </button>

            <button
              onClick={() => setCurrentView('clinician')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                currentView === 'clinician'
                  ? 'bg-indigo-700 text-white shadow-sm'
                  : 'text-indigo-300 hover:text-white hover:bg-indigo-950/40'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 text-indigo-300" />
              <span>Clinician Portal</span>
            </button>

            <button
              onClick={() => setCurrentView('research')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                currentView === 'research'
                  ? 'bg-stone-700 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white hover:bg-stone-700/40'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Research & Policy</span>
            </button>
          </nav>

          {/* Accessibility & System Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <div className="relative">
              <select
                aria-label="Select Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="bg-stone-800 border border-stone-700 text-stone-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium cursor-pointer"
              >
                <option value="en">English (EN)</option>
                <option value="as">অসমীয়া (Assamese)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="bodo">बड़ो (Bodo Demo)</option>
                <option value="khasi">Khasi (Demo)</option>
                <option value="mizo">Mizo (Demo)</option>
              </select>
            </div>

            {/* Font Resizer for Elderly Accessibility */}
            <button
              onClick={() => setFontSizeScale(fontSizeScale === 1.0 ? 1.25 : fontSizeScale === 1.25 ? 1.4 : 1.0)}
              title="Adjust Text Size for Accessibility"
              aria-label="Adjust Text Size"
              className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white border border-stone-700 text-xs font-bold px-2"
            >
              A{fontSizeScale > 1.0 ? '⁺' : ''}
            </button>

            {/* Offline Simulation Toggle */}
            <button
              onClick={toggleOfflineMode}
              title={isOffline ? 'Offline Mode Active (Click to go Online)' : 'Online Mode (Click to test Offline Mode)'}
              aria-label="Toggle Offline Mode"
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isOffline
                  ? 'bg-amber-900/60 border-amber-600 text-amber-200 shadow-sm animate-pulse'
                  : 'bg-stone-800 border-stone-700 text-emerald-400 hover:bg-stone-700'
              }`}
            >
              {isOffline ? <WifiOff className="w-3.5 h-3.5 text-amber-400" /> : <Wifi className="w-3.5 h-3.5 text-emerald-400" />}
              <span className="hidden sm:inline">{isOffline ? 'Offline' : 'Online'}</span>
              {isOffline && syncQueue.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-stone-900 font-bold text-[9px] flex items-center justify-center">
                  {syncQueue.length}
                </span>
              )}
            </button>

            {/* Audio Feedback Mute Toggle */}
            <button
              onClick={toggleAudioMute}
              title={isAudioMuted ? 'Sound Muted' : 'Harmonic Chimes Active'}
              aria-label="Toggle Sound"
              className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white border border-stone-700"
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-stone-800 text-xs">
          <button
            onClick={() => setCurrentView('landing')}
            className={`px-2 py-1 rounded ${currentView === 'landing' ? 'text-amber-400 font-bold' : 'text-stone-400'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setCurrentView('elderly')}
            className={`px-2 py-1 rounded ${currentView === 'elderly' ? 'text-rose-400 font-bold' : 'text-stone-400'}`}
          >
            Aita Mode
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
