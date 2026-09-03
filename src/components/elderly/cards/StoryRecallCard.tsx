'use client';

import React, { useState } from 'react';
import { FeedActivity } from '../../../data/types';
import { useApp } from '../../../context/AppContext';
import { TRANSLATIONS } from '../../../data/translations';
import { Volume2, BookOpen, CheckCircle2 } from 'lucide-react';
import DignifiedFeedback from '../../common/DignifiedFeedback';

interface StoryRecallCardProps {
  activity: FeedActivity;
}

export default function StoryRecallCard({ activity }: StoryRecallCardProps) {
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
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center space-x-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Folk Narrative Working Recall</span>
        </span>
        <button
          onClick={() => speakPrompt(activity.storySnippet ? `${activity.storySnippet}. ${audioInstruction}` : audioInstruction)}
          aria-label="Listen aloud"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-medium border border-stone-700"
        >
          <Volume2 className="w-4 h-4 text-amber-400" />
          <span>Listen to Story</span>
        </button>
      </div>

      {/* Story Vignette Box */}
      {activity.storySnippet && (
        <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-700/50 mb-6 text-stone-200 italic font-serif leading-relaxed text-base sm:text-lg">
          “{activity.storySnippet}”
        </div>
      )}

      <h2
        style={{ fontSize: `${1.3 * fontSizeScale}rem` }}
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
        message={isCorrectFeedback ? activity.dignifiedPraise : 'Thank you, Aita ❤️'}
        subMessage={
          isCorrectFeedback
            ? 'The Brahmaputra dolphin (Xihu) is a treasured symbol of Assam river life.'
            : activity.dignifiedEncouragement
        }
        onNext={handleNext}
        nextButtonText={t.nextActivityButton}
      />
    </div>
  );
}
