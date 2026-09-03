'use client';

import React, { useState } from 'react';
import { FeedActivity } from '../../../data/types';
import { useApp } from '../../../context/AppContext';
import { TRANSLATIONS } from '../../../data/translations';
import { Volume2, Mic, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import DignifiedFeedback from '../../common/DignifiedFeedback';

interface PhotoMemoryCardProps {
  activity: FeedActivity;
}

export default function PhotoMemoryCard({ activity }: PhotoMemoryCardProps) {
  const {
    language,
    recordAttempt,
    advanceToNextActivity,
    speakPrompt,
    startVoiceListening,
    isVoiceListening,
    simulatedSpeechText,
    fontSizeScale
  } = useApp();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hintRevealed, setHintRevealed] = useState<boolean>(false);
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

  const handleSelect = (optionId: string, isCorrect?: boolean) => {
    setSelectedOptionId(optionId);
    const hesitationSec = Math.max(1, Math.round((Date.now() - startTime) / 1000));
    const correct = isCorrect || optionId === activity.correctOptionId;

    setIsCorrectFeedback(correct);
    setShowFeedback(true);

    recordAttempt(
      correct ? 'recalled' : 'assisted',
      hesitationSec,
      false,
      hintRevealed
    );
  };

  const handleVoiceAnswer = () => {
    startVoiceListening((transcript) => {
      // Find matching option
      const matchingOpt = activity.options?.find(o =>
        transcript.toLowerCase().includes(o.text.toLowerCase()) ||
        (o.textAssamese && transcript.includes(o.textAssamese)) ||
        (o.textHindi && transcript.includes(o.textHindi))
      );

      const target = matchingOpt || activity.options?.find(o => o.isCorrect) || activity.options?.[0];
      if (target) {
        handleSelect(target.id, target.isCorrect);
      }
    });
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOptionId(null);
    setHintRevealed(false);
    advanceToNextActivity();
  };

  return (
    <div className="bg-stone-900/90 text-stone-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-800 backdrop-blur-sm max-w-3xl mx-auto">
      {/* Cultural & Memory Context Tag */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 tracking-wide">
          {activity.culturalContext}
        </span>
        <button
          onClick={() => speakPrompt(audioInstruction)}
          aria-label="Listen to question spoken aloud"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-medium border border-stone-700 transition-colors"
        >
          <Volume2 className="w-4 h-4 text-amber-400" />
          <span>{t.hearAgainButton}</span>
        </button>
      </div>

      {/* Prominent Family Photograph */}
      {activity.mediaUrl && (
        <div className="relative mb-6 rounded-2xl overflow-hidden border-2 border-stone-700/80 shadow-lg group">
          <img
            src={activity.mediaUrl}
            alt={activity.title}
            className="w-full h-64 sm:h-80 object-cover object-center filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-4">
            <p className="text-xs sm:text-sm text-stone-300 italic">
              Archival photograph from Aita’s personal family vault
            </p>
          </div>
        </div>
      )}

      {/* Primary Question in Large Dignified Typography */}
      <h2
        style={{ fontSize: `${1.4 * fontSizeScale}rem` }}
        className="font-serif font-bold text-stone-50 leading-snug mb-6 text-center"
      >
        {promptText}
      </h2>

      {/* Options Grid (Large, 56px+ Touch Targets) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
        {activity.options?.map((opt) => {
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
              style={{ minHeight: '64px', fontSize: `${1.1 * fontSizeScale}rem` }}
              className={`w-full px-5 py-4 rounded-2xl font-medium text-left transition-all flex items-center justify-between border-2 ${
                isSelected
                  ? 'bg-amber-600 border-amber-400 text-white shadow-lg shadow-amber-900/40'
                  : 'bg-stone-800/90 border-stone-700 hover:border-amber-500/60 text-stone-100 hover:bg-stone-750'
              } focus:outline-none focus:ring-4 focus:ring-amber-500/40`}
            >
              <span>{optText}</span>
              {isSelected && <CheckCircle2 className="w-5 h-5 text-white shrink-0 ml-2" />}
            </button>
          );
        })}
      </div>

      {/* Hint & Voice Assist Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800 text-sm">
        <button
          onClick={() => setHintRevealed(true)}
          className="flex items-center space-x-1.5 text-stone-400 hover:text-amber-300 py-2 px-3 rounded-xl hover:bg-stone-800/60 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>{t.notSureButton}</span>
        </button>

        {/* Voice-First Large Mic Button */}
        <button
          onClick={handleVoiceAnswer}
          disabled={isVoiceListening}
          className={`flex items-center space-x-2 py-2 px-4 rounded-2xl border transition-all ${
            isVoiceListening
              ? 'bg-rose-900/60 border-rose-500 text-rose-200 animate-pulse'
              : 'bg-stone-800 hover:bg-stone-700 border-stone-700 text-stone-200'
          }`}
        >
          <Mic className={`w-4 h-4 ${isVoiceListening ? 'text-rose-400' : 'text-amber-400'}`} />
          <span>{isVoiceListening ? simulatedSpeechText || t.voiceListening : t.tapToSpeak}</span>
        </button>
      </div>

      {/* Gentle Hint Drawer */}
      {hintRevealed && (
        <div className="mt-4 p-4 rounded-2xl bg-amber-950/40 border border-amber-600/40 text-amber-200 text-sm animate-fade-in">
          <p className="font-semibold mb-1">🌿 Gentle Memory Clue:</p>
          <p>
            Think back to the autumn trip in 1987. It was your younger sister who held your hand on the river ferry!
          </p>
        </div>
      )}

      {/* Dignified Affirmation Overlay */}
      <DignifiedFeedback
        isVisible={showFeedback}
        isSuccess={isCorrectFeedback}
        message={isCorrectFeedback ? activity.dignifiedPraise : 'Thank you, Aita ❤️'}
        subMessage={
          isCorrectFeedback
            ? 'Your autobiographical memories are cherished.'
            : activity.dignifiedEncouragement
        }
        onNext={handleNext}
        nextButtonText={t.nextActivityButton}
      />
    </div>
  );
}
