'use client';

import React, { useState } from 'react';
import { FeedActivity } from '../../../data/types';
import { useApp } from '../../../context/AppContext';
import { TRANSLATIONS } from '../../../data/translations';
import { Volume2, Mic, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import DignifiedFeedback from '../../common/DignifiedFeedback';

interface VoiceConversationCardProps {
  activity: FeedActivity;
}

export default function VoiceConversationCard({ activity }: VoiceConversationCardProps) {
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

  const [spokenText, setSpokenText] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
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

  const handleVoiceInput = () => {
    startVoiceListening((transcript) => {
      setSpokenText(transcript);
      const hesitationSec = Math.max(1, Math.round((Date.now() - startTime) / 1000));
      recordAttempt('recalled', hesitationSec, true, false);
      setShowFeedback(true);
    });
  };

  const handleOptionSelect = (optText: string) => {
    setSpokenText(optText);
    const hesitationSec = Math.max(1, Math.round((Date.now() - startTime) / 1000));
    recordAttempt('recalled', hesitationSec, false, false);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    advanceToNextActivity();
  };

  return (
    <div className="bg-stone-900/90 text-stone-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-800 backdrop-blur-sm max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center space-x-1.5">
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Warm Voice Conversation Companion</span>
        </span>
        <button
          onClick={() => speakPrompt(promptText)}
          aria-label="Listen aloud"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-medium border border-stone-700"
        >
          <Volume2 className="w-4 h-4 text-amber-400" />
          <span>{t.hearAgainButton}</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-teal-950/30 border border-teal-700/40 mb-6 text-center">
        <h2
          style={{ fontSize: `${1.4 * fontSizeScale}rem` }}
          className="font-serif font-bold text-teal-100 leading-snug mb-2"
        >
          {promptText}
        </h2>
        <p className="text-xs text-stone-400">
          Speak naturally or tap any response below • No pressure, take your time
        </p>
      </div>

      {/* Large Center Voice Microphone Button */}
      <div className="flex flex-col items-center justify-center my-6">
        <button
          onClick={handleVoiceInput}
          disabled={isVoiceListening}
          aria-label="Speak your response"
          className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 active:scale-95 border-4 ${
            isVoiceListening
              ? 'bg-rose-600 border-rose-400 animate-pulse text-white shadow-rose-900/50'
              : 'bg-gradient-to-tr from-amber-600 to-teal-600 border-amber-300/60 text-white shadow-amber-900/40 hover:border-amber-200'
          }`}
        >
          <Mic className="w-10 h-10 stroke-[2.5]" />
        </button>

        <p className="mt-3 text-sm font-medium text-stone-300">
          {isVoiceListening ? simulatedSpeechText || 'Listening to your voice...' : 'Tap the microphone to reply'}
        </p>
      </div>

      {/* Quick Tap Alternatives */}
      <div className="space-y-2.5 mb-2">
        <p className="text-xs text-stone-400 text-center uppercase tracking-wider mb-2">
          Or tap an answer with one touch:
        </p>
        {activity.options?.map((opt) => {
          const optText =
            language === 'as' && opt.textAssamese
              ? opt.textAssamese
              : language === 'hi' && opt.textHindi
              ? opt.textHindi
              : opt.text;

          return (
            <button
              key={opt.id}
              onClick={() => handleOptionSelect(optText)}
              style={{ minHeight: '56px', fontSize: `${1.05 * fontSizeScale}rem` }}
              className="w-full px-5 py-3 rounded-2xl bg-stone-800/80 border border-stone-700 hover:border-teal-500 text-stone-200 hover:bg-stone-750 font-medium text-left transition-colors flex items-center justify-between"
            >
              <span>{optText}</span>
              <span className="text-stone-400 text-xs">Tap</span>
            </button>
          );
        })}
      </div>

      <DignifiedFeedback
        isVisible={showFeedback}
        isSuccess={true}
        message="It is delightful to hear your voice, Aita ❤️"
        subMessage={`You shared: “${spokenText}”. Speaking and sharing preserves the joy of everyday life.`}
        onNext={handleNext}
        nextButtonText={t.nextActivityButton}
      />
    </div>
  );
}
