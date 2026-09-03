'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Send, MessageCircle, Sparkles, User, CheckCircle2 } from 'lucide-react';

export default function IntergenerationalPrompts() {
  const {
    intergenerationalMessages,
    addIntergenerationalMessage,
    patient
  } = useApp();

  const [senderName, setSenderName] = useState('');
  const [senderRelation, setSenderRelation] = useState('Granddaughter');
  const [question, setQuestion] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !question) return;

    addIntergenerationalMessage({
      senderName,
      senderRelation,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      question,
      questionAssamese: question
    });

    setSenderName('');
    setQuestion('');
  };

  return (
    <div className="bg-stone-900/95 text-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400/40" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-rose-100">
              Intergenerational Memory Bridge
            </h2>
          </div>
          <p className="text-sm text-stone-400 mt-1">
            “Tell Me About Them” — Grandchildren and family connect with Aita, preserving oral history while stimulating deep reminiscence.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        {/* Messages List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-300">
            Family Inquiries & Aita’s Voice Responses
          </h3>

          {intergenerationalMessages.map((msg) => (
            <div
              key={msg.id}
              className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700 shadow-md space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={msg.avatarUrl}
                    alt={msg.senderName}
                    className="w-10 h-10 rounded-full object-cover border border-rose-400"
                  />
                  <div>
                    <h4 className="font-bold text-stone-100 text-sm">{msg.senderName}</h4>
                    <span className="text-[11px] text-stone-400">{msg.senderRelation} • {msg.dateSent}</span>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                    msg.status === 'answered'
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-700/60'
                      : 'bg-amber-950 text-amber-300 border-amber-700/60'
                  }`}
                >
                  {msg.status === 'answered' ? 'Answered by Aita' : 'Appearing in Feed'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-stone-900/60 text-stone-200 text-xs italic">
                “{msg.question}”
              </div>

              {msg.patientVoiceResponse && (
                <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-100 text-xs">
                  <span className="font-semibold block mb-1 text-rose-300 flex items-center">
                    <Heart className="w-3 h-3 mr-1 fill-rose-300" />
                    Aita’s Recorded Response:
                  </span>
                  <p className="italic">“{msg.patientVoiceResponse}”</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Send Prompt Form */}
        <div className="p-6 rounded-2xl bg-stone-800/60 border border-stone-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="font-serif font-bold text-base text-stone-100">
                Ask Aita a Heritage Question
              </h3>
            </div>
            <p className="text-xs text-stone-300 mb-4 leading-relaxed">
              Grandchildren can ask about past festivals, family recipes, songs, or village life in Assam.
            </p>

            <form onSubmit={handleSend} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Baruah"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                  Relationship to Aita
                </label>
                <select
                  value={senderRelation}
                  onChange={(e) => setSenderRelation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="Granddaughter">Granddaughter (নাতিনী)</option>
                  <option value="Grandson">Grandson (নাতি)</option>
                  <option value="Daughter">Daughter (জী)</option>
                  <option value="Son">Son (পুত্ৰ)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-300 mb-1">
                  Question or Story Prompt
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Aita, what was your favorite Bihu song when you were young?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-xs text-stone-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send to Aita’s Feed</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
