'use client';

import React, { useState } from 'react';
import { FeedActivity, ActivityOption } from '../../../data/types';
import { useApp } from '../../../context/AppContext';
import { TRANSLATIONS } from '../../../data/translations';
import { Volume2, Sparkles, CheckCircle2, Shield, Eye } from 'lucide-react';
import DignifiedFeedback from '../../common/DignifiedFeedback';

interface FamiliarObjectCardProps {
  activity: FeedActivity;
}

export default function FamiliarObjectCard({ activity }: FamiliarObjectCardProps) {
  const {
    language,
    recordAttempt,
    advanceToNextActivity,
    speakPrompt,
    fontSizeScale
  } = useApp();

  const [phase, setPhase] = useState<'explore' | 'recall'>('explore');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
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

  const handleSelect = (optId: string, isCorrect?: boolean) => {
    setSelectedOptionId(optId);
    const correct = isCorrect || optId === activity.correctOptionId;
    setIsCorrectFeedback(correct);
    setShowFeedback(true);

    const hesitationSec = Math.max(1, Math.round((Date.now() - startTime) / 1000));
    recordAttempt(correct ? 'recalled' : 'assisted', hesitationSec, false, false);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOptionId(null);
    advanceToNextActivity();
  };

  return (
    <div className="bg-stone-900/90 text-stone-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-800 backdrop-blur-sm max-w-3xl mx-auto">
      {/* Heritage Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
          Cultural Heritage Recognition • Assam
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
        className="font-serif font-bold text-stone-50 leading-snug mb-5 text-center"
      >
        {promptText}
      </h2>

      {phase === 'explore' ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-amber-600/30 flex items-center justify-center mb-3">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="font-bold text-stone-100 text-base mb-1">Xorai (শৰাই)</h3>
              <p className="text-xs text-stone-400">Bell-metal sacred offering tray with stand</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-600/30 flex items-center justify-center mb-3">
                <span className="text-2xl">👒</span>
              </div>
              <h3 className="font-bold text-stone-100 text-base mb-1">Japi (জাপি)</h3>
              <p className="text-xs text-stone-400">Woven conical bamboo hat with red fabric</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-rose-600/30 flex items-center justify-center mb-3">
                <span className="text-2xl">🥁</span>
              </div>
              <h3 className="font-bold text-stone-100 text-base mb-1">Bihu Dhol (ঢোল)</h3>
              <p className="text-xs text-stone-400">Two-sided wooden rhythm drum for Bohag</p>
            </div>
          </div>

          <button
            onClick={() => setPhase('recall')}
            className="w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-lg flex items-center justify-center space-x-2 transition-all shadow-lg shadow-amber-950/40"
          >
            <Eye className="w-5 h-5" />
            <span>Ready for the Question</span>
          </button>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <p className="text-stone-300 text-center text-sm mb-2">
            Tap the sacred bell-metal offering tray of Assam:
          </p>

          <div className="grid grid-cols-1 gap-3.5">
            {activity.options?.map((opt: ActivityOption) => {
              const optText =
                language === 'as' && opt.textAssamese
                  ? opt.textAssamese
                  : language === 'hi' && opt.textHindi
                  ? opt.textHindi
                  : opt.text;

              const isSelected = selectedOptionId === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id, opt.isCorrect)}
                  style={{ minHeight: '60px', fontSize: `${1.1 * fontSizeScale}rem` }}
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
        </div>
      )}

      <DignifiedFeedback
        isVisible={showFeedback}
        isSuccess={isCorrectFeedback}
        message={isCorrectFeedback ? activity.dignifiedPraise : 'Blessings, Aita ❤️'}
        subMessage={
          isCorrectFeedback
            ? 'The Xorai has been cherished in Assam for centuries.'
            : activity.dignifiedEncouragement
        }
        onNext={handleNext}
        nextButtonText={t.nextActivityButton}
      />
    </div>
  );
}
