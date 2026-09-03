'use client';

import React, { useState } from 'react';
import { FeedActivity } from '../../../data/types';
import { useApp } from '../../../context/AppContext';
import { TRANSLATIONS } from '../../../data/translations';
import { Volume2, Music, CheckCircle2 } from 'lucide-react';
import DignifiedFeedback from '../../common/DignifiedFeedback';

interface CulturalMemoryCardProps {
  activity: FeedActivity;
}

export default function CulturalMemoryCard({ activity }: CulturalMemoryCardProps) {
  const {
    language,
    recordAttempt,
    advanceToNextActivity,
    speakPrompt,
    fontSizeScale
  } = useApp();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrectFeedback, setIsCorrectFeedback] = useState<boolean>(true);
  const [startTime] = useState<number>(Date.now());

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const promptText =
    language === 'as' && activity.promptTextAssamese
      ? activity.promptTextAssamese
      : language === 'hi' && activity.promptTextHindi
      ? activity.promptTextHindi
      : activity.promptText;

  const audioInstruction =
    language === 'as' && activity.audioInstructionAssamese
      ? activity.audioInstructionAssamese
      : language === 'hi' && activity.audioInstructionHindi
      ? activity.audioInstructionHindi
      : activity.audioInstruction;

  const handleSelect = (id: string, isCorrect?: boolean) => {
    setSelectedId(id);
    const correct = isCorrect || id === activity.correctOptionId;
    setIsCorrectFeedback(correct);
    setShowFeedback(true);

    const hesitationSec = Math.max(1, Math.round((Date.now() - startTime) / 1000));
    recordAttempt(correct ? 'recalled' : 'assisted', hesitationSec, false, false);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedId(null);
    advanceToNextActivity();
  };

  return (
    <div className="bg-stone-900/90 text-stone-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-800 backdrop-blur-sm max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center space-x-1.5">
          <Music className="w-3.5 h-3.5" />
          <span>Cultural Musical Heritage • Bihu</span>
        </span>
        <button
          onClick={() => speakPrompt(audioInstruction)}
          aria-label="Listen aloud"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-medium border border-stone-700"
        >
          <Volume2 className="w-4 h-4 text-amber-400" />
          <span>{t.hearAgainButton}</span>
        </button>
      </div>

      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-3xl">
          🎺
        </div>
      </div>

      <h2
        style={{ fontSize: `${1.35 * fontSizeScale}rem` }}
        className="font-serif font-bold text-stone-50 leading-snug mb-6 text-center"
      >
        {promptText}
      </h2>

      <div className="grid grid-cols-1 gap-3.5 mb-6">
        {activity.options?.map((opt) => {
          const optText =
            language === 'as' && opt.textAssamese
              ? opt.textAssamese
              : language === 'hi' && opt.textHindi
              ? opt.textHindi
              : opt.text;

          const isSelected = selectedId === opt.id;

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id, opt.isCorrect)}
              style={{ minHeight: '62px', fontSize: `${1.1 * fontSizeScale}rem` }}
              className={`w-full px-5 py-4 rounded-2xl font-medium text-left transition-all flex items-center justify-between border-2 ${
                isSelected
                  ? 'bg-amber-600 border-amber-400 text-white shadow-lg'
                  : 'bg-stone-800/90 border-stone-700 hover:border-amber-500 text-stone-100'
              }`}
            >
              <span>{optText}</span>
              {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
            </button>
          );
        })}
      </div>

      <DignifiedFeedback
        isVisible={showFeedback}
        isSuccess={isCorrectFeedback}
        message={isCorrectFeedback ? activity.dignifiedPraise : 'Blessings, Aita ❤️'}
        subMessage={
          isCorrectFeedback
            ? 'The Pepa’s joyful melody has echoed across Assam for generations.'
            : activity.dignifiedEncouragement
        }
        onNext={handleNext}
        nextButtonText={t.nextActivityButton}
      />
    </div>
  );
}
