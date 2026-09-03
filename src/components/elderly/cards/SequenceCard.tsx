'use client';

import React, { useState } from 'react';
import { FeedActivity } from '../../../data/types';
import { useApp } from '../../../context/AppContext';
import { TRANSLATIONS } from '../../../data/translations';
import { Volume2, CheckCircle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import DignifiedFeedback from '../../common/DignifiedFeedback';

interface SequenceCardProps {
  activity: FeedActivity;
}

export default function SequenceCard({ activity }: SequenceCardProps) {
  const {
    language,
    recordAttempt,
    advanceToNextActivity,
    speakPrompt,
    fontSizeScale
  } = useApp();

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [startTime] = useState<number>(Date.now());

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const steps = activity.sequenceSteps || [];

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

  const handleStepClick = (stepNumber: number) => {
    // If user selects the next logical step in the tea preparation ritual
    if (stepNumber === currentStepIndex + 1) {
      const nextCompleted = [...completedSteps, stepNumber];
      setCompletedSteps(nextCompleted);
      setCurrentStepIndex(prev => prev + 1);

      if (nextCompleted.length === steps.length) {
        const hesitationSec = Math.max(1, Math.round((Date.now() - startTime) / 1000));
        recordAttempt('recalled', hesitationSec, false, false);
        setShowFeedback(true);
      }
    } else {
      // Gentle encouragement for mis-tap
      speakPrompt('Almost there, Aita. What step comes first?');
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setCompletedSteps([]);
  };

  const handleNext = () => {
    setShowFeedback(false);
    advanceToNextActivity();
  };

  return (
    <div className="bg-stone-900/90 text-stone-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-800 backdrop-blur-sm max-w-3xl mx-auto">
      {/* Category header */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Executive Routine Memory • Daily Tea Ritual
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
        Tap each step in order to make warm morning tea (Step {currentStepIndex + 1} of {steps.length}):
      </p>

      {/* Interactive Sequence Tiles */}
      <div className="space-y-3 mb-6">
        {steps.map((step) => {
          const isDone = completedSteps.includes(step.stepNumber);
          const isCurrentTarget = step.stepNumber === currentStepIndex + 1;

          return (
            <button
              key={step.id}
              onClick={() => handleStepClick(step.stepNumber)}
              disabled={isDone}
              style={{ minHeight: '60px', fontSize: `${1.05 * fontSizeScale}rem` }}
              className={`w-full p-4 rounded-2xl font-medium text-left transition-all flex items-center justify-between border-2 ${
                isDone
                  ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200 opacity-90'
                  : isCurrentTarget
                  ? 'bg-stone-800 border-amber-500 text-amber-100 shadow-md animate-pulse'
                  : 'bg-stone-800/60 border-stone-700 text-stone-300 hover:bg-stone-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurrentTarget
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-700 text-stone-300'
                  }`}
                >
                  {isDone ? '✓' : step.stepNumber}
                </span>
                <span>{step.text}</span>
              </div>
              {isDone && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-800">
        <button
          onClick={handleReset}
          className="flex items-center space-x-1 hover:text-amber-300 py-1 px-2 rounded"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Start Over</span>
        </button>
        <span>Sequence memory stimulates daily independence</span>
      </div>

      <DignifiedFeedback
        isVisible={showFeedback}
        isSuccess={true}
        message={activity.dignifiedPraise}
        subMessage="The ritual of preparing tea is deeply imprinted in our heart and habits."
        onNext={handleNext}
        nextButtonText={t.nextActivityButton}
      />
    </div>
  );
}
