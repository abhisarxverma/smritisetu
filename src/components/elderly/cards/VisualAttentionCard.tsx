'use client';

import React, { useState } from 'react';
import { FeedActivity } from '../../../data/types';
import { useApp } from '../../../context/AppContext';
import { TRANSLATIONS } from '../../../data/translations';
import { Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import DignifiedFeedback from '../../common/DignifiedFeedback';

interface VisualAttentionCardProps {
  activity: FeedActivity;
}

export default function VisualAttentionCard({ activity }: VisualAttentionCardProps) {
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
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
          Visual Attention • Spot the Flower
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

      <h2
        style={{ fontSize: `${1.35 * fontSizeScale}rem` }}
        className="font-serif font-bold text-stone-50 leading-snug mb-3 text-center"
      >
        {promptText}
      </h2>

      <p className="text-stone-300 text-center text-sm mb-6">
        Tap on the blooming purple Kopou orchid:
      </p>

      {/* Visual Garden Tiles Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {activity.options?.map((opt) => {
          const isTarget = opt.isCorrect;
          const optText =
            language === 'as' && opt.textAssamese
              ? opt.textAssamese
              : language === 'hi' && opt.textHindi
              ? opt.textHindi
              : opt.text;

          return (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id, opt.isCorrect)}
              style={{ minHeight: '120px' }}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all border-2 ${
                isTarget
                  ? 'bg-gradient-to-b from-rose-950/60 to-purple-950/60 border-rose-500/80 hover:border-rose-400 hover:scale-105'
                  : 'bg-stone-800/80 border-stone-700 hover:border-stone-600 hover:scale-102'
              } shadow-md`}
            >
              <span className="text-3xl mb-2">
                {isTarget ? '🌸' : opt.id.includes('tea') ? '🍃' : opt.id.includes('banana') ? '🌿' : '🎋'}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-stone-200">
                {optText}
              </span>
            </button>
          );
        })}
      </div>

      <DignifiedFeedback
        isVisible={showFeedback}
        isSuccess={isCorrectFeedback}
        message={isCorrectFeedback ? activity.dignifiedPraise : 'Thank you, Aita ❤️'}
        subMessage={
          isCorrectFeedback
            ? 'The Kopou Phool is beloved during Rongali Bihu celebrations in Assam.'
            : activity.dignifiedEncouragement
        }
        onNext={handleNext}
        nextButtonText={t.nextActivityButton}
      />
    </div>
  );
}
