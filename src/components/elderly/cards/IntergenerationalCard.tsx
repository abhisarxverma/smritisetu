'use client';

import React, { useState } from 'react';
import { FeedActivity } from '../../../data/types';
import { useApp } from '../../../context/AppContext';
import { TRANSLATIONS } from '../../../data/translations';
import { Volume2, Mic, Heart, Send, Sparkles } from 'lucide-react';
import DignifiedFeedback from '../../common/DignifiedFeedback';

interface IntergenerationalCardProps {
  activity: FeedActivity;
}

export default function IntergenerationalCard({ activity }: IntergenerationalCardProps) {
  const {
    language,
    recordAttempt,
    advanceToNextActivity,
    speakPrompt,
    answerIntergenerationalMessage,
    fontSizeScale
  } = useApp();

  const [recordedMessage, setRecordedMessage] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [startTime] = useState<number>(Date.now());

  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const sender = activity.intergenerationalSender;

  const promptText =
    language === 'as' && activity.promptTextAssamese
      ? activity.promptTextAssamese
      : language === 'hi' && activity.promptTextHindi
      ? activity.promptTextHindi
      : activity.promptText;

  const handleRecordOrReply = (responseSnippet: string) => {
    setRecordedMessage(responseSnippet);
    if (activity.id.includes('10')) {
      answerIntergenerationalMessage('intergen-01', responseSnippet);
    }
    const hesitationSec = Math.max(1, Math.round((Date.now() - startTime) / 1000));
    recordAttempt('recalled', hesitationSec, true, false);
    setShowFeedback(true);
  };

  const handleNext = () => {
    setShowFeedback(false);
    advanceToNextActivity();
  };

  return (
    <div className="bg-stone-900/90 text-stone-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-800 backdrop-blur-sm max-w-3xl mx-auto">
      {/* Intergenerational Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center space-x-1.5">
          <Heart className="w-3.5 h-3.5 fill-rose-300" />
          <span>Intergenerational Memory Bridge • Family Love</span>
        </span>
        <button
          onClick={() => speakPrompt(promptText)}
          aria-label="Listen aloud"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-medium border border-stone-700"
        >
          <Volume2 className="w-4 h-4 text-amber-400" />
          <span>Listen to Ananya</span>
        </button>
      </div>

      {/* Grandchild Card Bubble */}
      {sender && (
        <div className="flex items-center space-x-4 p-4 rounded-2xl bg-rose-950/30 border border-rose-700/40 mb-6">
          <img
            src={sender.avatarUrl}
            alt={sender.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-rose-400 shrink-0"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-rose-100 text-base">{sender.name}</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-rose-900/60 text-rose-300 border border-rose-700/60">
                {sender.relation}
              </span>
            </div>
            <p className="text-xs text-rose-200/80 mt-1">{sender.note}</p>
          </div>
        </div>
      )}

      <h2
        style={{ fontSize: `${1.35 * fontSizeScale}rem` }}
        className="font-serif font-bold text-stone-50 leading-snug mb-6 text-center"
      >
        {promptText}
      </h2>

      {/* Interactive Response Choices */}
      <div className="space-y-3 mb-6">
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
              onClick={() => handleRecordOrReply(optText)}
              style={{ minHeight: '60px', fontSize: `${1.05 * fontSizeScale}rem` }}
              className="w-full px-5 py-4 rounded-2xl bg-stone-800/80 border border-stone-700 hover:border-rose-400 text-stone-100 hover:bg-stone-750 font-medium text-left transition-all flex items-center justify-between"
            >
              <span>{optText}</span>
              <Send className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
            </button>
          );
        })}
      </div>

      <DignifiedFeedback
        isVisible={showFeedback}
        isSuccess={true}
        message="Ananya will be overjoyed, Aita! ❤️"
        subMessage={`Your message has been saved into the family vault: “${recordedMessage}”. Intergenerational stories preserve family roots forever.`}
        onNext={handleNext}
        nextButtonText={t.nextActivityButton}
      />
    </div>
  );
}
