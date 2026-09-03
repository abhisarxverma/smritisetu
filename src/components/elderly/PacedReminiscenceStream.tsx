'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import VisualMemoryMatchCard from './cards/VisualMemoryMatchCard';
import AudioReminiscenceCard from './cards/AudioReminiscenceCard';
import VoiceBiomarkerCard from './cards/VoiceBiomarkerCard';
import FamilyConnectionCard from './cards/FamilyConnectionCard';
import { Home, ChevronUp, ChevronDown } from 'lucide-react';
import { audioService } from '../../lib/audioService';

export default function PacedReminiscenceStream() {
  const { setCurrentView, resetSession, stopVoiceListening } = useApp();
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalCards = 4;

  const scrollToCard = (index: number) => {
    if (containerRef.current) {
      const targetCard = containerRef.current.children[index] as HTMLElement;
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth' });
        setCurrentCardIndex(index);
        audioService.playGentleChime('transition');
      }
    }
  };

  const handleNext = () => {
    if (currentCardIndex < totalCards - 1) {
      scrollToCard(currentCardIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      scrollToCard(currentCardIndex - 1);
    }
  };

  const handleSafeReturn = () => {
    audioService.stopSpeech();
    stopVoiceListening();
    audioService.playGentleChime('rest');
    resetSession();
    setCurrentView('landing');
  };

  // Synchronize scroll snap position
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const height = el.clientHeight;
      if (height > 0) {
        const newIndex = Math.round(el.scrollTop / height);
        if (newIndex !== currentCardIndex && newIndex >= 0 && newIndex < totalCards) {
          setCurrentCardIndex(newIndex);
        }
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [currentCardIndex]);

  return (
    <div className="w-full h-[100dvh] bg-[#0a192f] flex flex-col overflow-hidden select-none">
      
      {/* Clean, Non-Congested Top Bar (Integrated Controls, Zero Floating Overlaps) */}
      <div className="h-14 bg-[#07111e] border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20">
        
        {/* Prominent, High-Contrast Home / Safe Button */}
        <button
          onClick={handleSafeReturn}
          aria-label="Home and Safe Button - Return to calm starting screen"
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm sm:text-base shadow-md transform active:scale-95 transition-all cursor-pointer"
        >
          <Home className="w-4 h-4 stroke-[3] text-slate-950" />
          <span>HOME / SAFE</span>
        </button>

        {/* Quiet Step Progress Indicator */}
        <div className="flex items-center space-x-2">
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              aria-label={`Jump to memory ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === currentCardIndex
                  ? 'w-7 bg-yellow-300'
                  : 'w-2.5 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
          <span className="text-xs font-mono font-bold text-slate-300 ml-1">
            {currentCardIndex + 1} / {totalCards}
          </span>
        </div>

        {/* Up / Down Navigation Step Arrows */}
        <div className="flex items-center space-x-1">
          <button
            onClick={handlePrev}
            disabled={currentCardIndex === 0}
            aria-label="Previous card"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-20 text-yellow-300 transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentCardIndex === totalCards - 1}
            aria-label="Next card"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-20 text-yellow-300 transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Vertical Snap-Scroll Feed: Full Screen, One Card per Viewport */}
      <div
        ref={containerRef}
        style={{ scrollSnapType: 'y mandatory' }}
        className="w-full flex-1 overflow-y-scroll scroll-smooth snap-y snap-mandatory no-scrollbar"
      >
        <div className="w-full h-full snap-start snap-always">
          <VisualMemoryMatchCard onComplete={handleNext} />
        </div>

        <div className="w-full h-full snap-start snap-always">
          <AudioReminiscenceCard onComplete={handleNext} />
        </div>

        <div className="w-full h-full snap-start snap-always">
          <VoiceBiomarkerCard onComplete={handleNext} />
        </div>

        <div className="w-full h-full snap-start snap-always">
          <FamilyConnectionCard />
        </div>
      </div>
    </div>
  );
}
