'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import ElderlyHeader from './ElderlyHeader';
import PhotoMemoryCard from './cards/PhotoMemoryCard';
import FamiliarObjectCard from './cards/FamiliarObjectCard';
import SequenceCard from './cards/SequenceCard';
import VisualAttentionCard from './cards/VisualAttentionCard';
import LanguageRecallCard from './cards/LanguageRecallCard';
import OrientationCard from './cards/OrientationCard';
import StoryRecallCard from './cards/StoryRecallCard';
import CulturalMemoryCard from './cards/CulturalMemoryCard';
import VoiceConversationCard from './cards/VoiceConversationCard';
import IntergenerationalCard from './cards/IntergenerationalCard';
import RestBreakCard from './cards/RestBreakCard';
import { Sparkles, BrainCircuit, Heart, RotateCcw, ShieldCheck, ArrowRight } from 'lucide-react';

export default function TherapeuticFeed() {
  const {
    currentActivity,
    feedIndex,
    feedExplainability,
    currentDifficulty,
    isSessionCompleted,
    resetSession,
    sessionSeconds,
    cognitiveProfile,
    setCurrentView
  } = useApp();

  const elapsedMins = Math.floor(sessionSeconds / 60);

  // If the session was completed for the day
  if (isSessionCompleted) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 animate-fade-in">
        <ElderlyHeader />
        <div className="bg-stone-900 text-stone-100 rounded-3xl p-8 sm:p-12 shadow-2xl border border-amber-600/40 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-900/30">
            <Heart className="w-10 h-10 text-white fill-white/80" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100 mb-3">
            Peaceful Session Completed, Aita ❤️
          </h2>
          <p className="text-stone-300 text-base sm:text-lg max-w-xl mx-auto mb-8 font-light">
            You spent {elapsedMins || 12} mindful minutes connecting with family memories, cultural heritage, and gentle thoughts. Your mind has had a wonderful, dignified rest.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md mx-auto mb-8">
            <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700">
              <span className="text-2xl font-mono font-bold text-amber-400">
                {cognitiveProfile.todayActivitiesCompleted || 7}
              </span>
              <p className="text-xs text-stone-400 mt-1">Activities Completed</p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700">
              <span className="text-2xl font-mono font-bold text-emerald-400">
                {elapsedMins || 12}m
              </span>
              <p className="text-xs text-stone-400 mt-1">Mindful Time</p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-800 border border-stone-700 col-span-2 sm:col-span-1">
              <span className="text-2xl font-mono font-bold text-rose-400">
                100%
              </span>
              <p className="text-xs text-stone-400 mt-1">Dignity Protected</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentView('caregiver')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-600 text-white font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              <span>View Caregiver Sanctuary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={resetSession}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium transition-colors border border-stone-700 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Explore More Activities</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Feed Card Render
  const renderCard = () => {
    switch (currentActivity.type) {
      case 'photo_memory':
        return <PhotoMemoryCard activity={currentActivity} />;
      case 'object_memory':
        return <FamiliarObjectCard activity={currentActivity} />;
      case 'sequence':
        return <SequenceCard activity={currentActivity} />;
      case 'attention':
        return <VisualAttentionCard activity={currentActivity} />;
      case 'language':
        return <LanguageRecallCard activity={currentActivity} />;
      case 'orientation':
        return <OrientationCard activity={currentActivity} />;
      case 'story_recall':
        return <StoryRecallCard activity={currentActivity} />;
      case 'cultural_memory':
        return <CulturalMemoryCard activity={currentActivity} />;
      case 'voice_conversation':
        return <VoiceConversationCard activity={currentActivity} />;
      case 'intergenerational':
        return <IntergenerationalCard activity={currentActivity} />;
      case 'rest_break':
        return <RestBreakCard activity={currentActivity} />;
      default:
        return <PhotoMemoryCard activity={currentActivity} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-6 px-4">
      {/* Personalized Greeting and Session Pill */}
      <ElderlyHeader />

      {/* Main Therapeutic Feed Stream Card */}
      <div className="mb-6 transition-all">
        {renderCard()}
      </div>

      {/* Transparent AI Cognitive Feed Engine Explainability Chip */}
      <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-stone-900/70 border border-stone-800 text-xs text-stone-300 flex items-start space-x-3 shadow-md">
        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0 mt-0.5">
          <BrainCircuit className="w-4 h-4 text-amber-400" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-semibold text-amber-300 uppercase tracking-wider text-[10px]">
              Adaptive Feed Engine Intelligence
            </span>
            <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700 text-[10px] font-mono">
              Card #{feedIndex + 1}
            </span>
            <span className="px-2 py-0.5 rounded bg-stone-800 text-teal-300 border border-teal-800/40 text-[10px] capitalize">
              Pacing: {currentDifficulty}
            </span>
          </div>
          <p className="text-stone-300 leading-relaxed text-xs">
            {feedExplainability}
          </p>
        </div>
      </div>
    </div>
  );
}
