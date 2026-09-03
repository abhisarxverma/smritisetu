'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  Sparkles,
  Brain,
  Users,
  Stethoscope,
  WifiOff,
  Volume2,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Layers,
  Clock,
  Compass,
  Smile,
  BookOpen,
  MessageCircle,
  HelpCircle
} from 'lucide-react';

export default function LandingPage() {
  const { setCurrentView, setLanguage, isOffline, toggleOfflineMode } = useApp();

  return (
    <div className="space-y-24 pb-20 text-stone-100 animate-fade-in overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Subtle Cultural Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-amber-600/20 via-rose-600/15 to-teal-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Smart India Hackathon 2026 • Healthcare Innovation</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-stone-50 leading-[1.15]">
            A smarter feed for a{' '}
            <span className="bg-gradient-to-r from-amber-400 via-rose-300 to-teal-300 bg-clip-text text-transparent">
              healthier mind.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed font-light">
            Personalized cognitive stimulation, cherished family memories, and regional cultural moments — redesigned from the familiar infinite-feed model for elderly dignity in North-East India.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentView('elderly')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold text-lg shadow-xl shadow-amber-950/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 border border-amber-300/30"
            >
              <Heart className="w-5 h-5 fill-white/80" />
              <span>Launch Aita Mode (Elderly Feed)</span>
            </button>

            <button
              onClick={() => setCurrentView('caregiver')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-stone-800/90 hover:bg-stone-750 text-teal-300 font-semibold text-base border border-stone-700 hover:border-teal-500/60 transition-all flex items-center justify-center space-x-2"
            >
              <Users className="w-5 h-5 text-teal-400" />
              <span>Caregiver Sanctuary</span>
            </button>

            <button
              onClick={() => setCurrentView('clinician')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-stone-800/90 hover:bg-stone-750 text-indigo-300 font-semibold text-base border border-stone-700 hover:border-indigo-500/60 transition-all flex items-center justify-center space-x-2"
            >
              <Stethoscope className="w-5 h-5 text-indigo-400" />
              <span>Clinician Portal</span>
            </button>
          </div>

          <div className="flex items-center justify-center space-x-6 text-xs text-stone-400 pt-3">
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
              Bounded Mindful Sessions (10-15m)
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
              Offline-Ready Core Flow
            </span>
            <span className="flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mr-1.5" />
              Non-Diagnostic & Dignified
            </span>
          </div>
        </div>

        {/* Interactive 3-Role Simulation Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-6xl mx-auto">
          {/* Card 1: Elderly Mode */}
          <div
            onClick={() => setCurrentView('elderly')}
            className="p-6 rounded-3xl bg-stone-900/90 border border-amber-600/40 hover:border-amber-500 shadow-xl cursor-pointer hover:-translate-y-1 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 fill-amber-400/40" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-serif font-bold text-amber-100">
                1. Elderly Patient Mode
              </h3>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                Aita Mode
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed mb-4">
              Calm, clutter-free therapeutic stream with 64px touch targets, spoken voice audio, zero-stress feedback, and verified family photos.
            </p>
            <div className="flex items-center text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Enter Feed Experience</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Card 2: Caregiver Sanctuary */}
          <div
            onClick={() => setCurrentView('caregiver')}
            className="p-6 rounded-3xl bg-stone-900/90 border border-teal-600/40 hover:border-teal-500 shadow-xl cursor-pointer hover:-translate-y-1 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-serif font-bold text-teal-100">
                2. Caregiver Sanctuary
              </h3>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                Family
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed mb-4">
              Curate the Personal Memory Vault, configure daily session caps (10-20m), read daily AI activity summaries, and log observations.
            </p>
            <div className="flex items-center text-xs font-bold text-teal-400 group-hover:translate-x-1 transition-transform">
              <span>Open Caregiver Portal</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Card 3: Clinician Insights */}
          <div
            onClick={() => setCurrentView('clinician')}
            className="p-6 rounded-3xl bg-stone-900/90 border border-indigo-600/40 hover:border-indigo-500 shadow-xl cursor-pointer hover:-translate-y-1 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-serif font-bold text-indigo-100">
                3. Clinician Insights
              </h3>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                Health Worker
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed mb-4">
              Longitudinal cognitive domain trajectories, automated variance alerts (+1.2s hesitation flags), and ABDM/FHIR exportable clinical summaries.
            </p>
            <div className="flex items-center text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
              <span>Inspect Clinical Telemetry</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM & THE NORTH-EAST DISPARITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">
              The Reality & The Challenge
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-50 mt-1 mb-4">
              Why Existing Digital Cognitive Apps Fail Indian Seniors
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              India faces a rapidly ageing population and rising dementia-care needs. Many digital cognitive tools are still too generic, too language-limited, or too dependent on constant connectivity for elderly users in rural North-East India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-5 rounded-2xl bg-stone-800/60 border border-stone-700/60">
              <h3 className="font-bold text-rose-300 text-base mb-2">Cultural & Linguistic Alienation</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Generic games built around unfamiliar objects or English-only instructions can feel confusing and less meaningful for elderly citizens in Assam, Meghalaya, Mizoram, and other NER communities.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/60 border border-stone-700/60">
              <h3 className="font-bold text-amber-300 text-base mb-2">Complex UI & Digital Friction</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Dense dashboards, multi-level dropdowns, and tiny cards demand heavy digital literacy that an 80-year-old living in a remote village simply cannot navigate independently.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/60 border border-stone-700/60">
              <h3 className="font-bold text-teal-300 text-base mb-2">Unreliable Rural Connectivity</h3>
              <p className="text-xs text-stone-400 leading-relaxed">
                Many apps assume reliable cloud access. North-Eastern hill and rural deployments need offline-first patterns that preserve the core activity flow during connectivity gaps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE CORE INNOVATION: BOUNDED THERAPEUTIC FEED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              Our Central Interface Breakthrough
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-50 leading-tight">
              The Bounded Therapeutic Feed
            </h2>
            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
              Modern digital platforms have normalized the effortless, continuous feed. Instead of fighting this intuitive behavioral pattern, we redesigned it from first principles:
            </p>
            <div className="p-4 rounded-2xl bg-amber-950/40 border-l-4 border-amber-500 text-amber-200 text-sm font-medium italic">
              “Take the engagement mechanics of infinite feeds and redesign them around cognitive wellbeing instead of addictive entertainment.”
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-300">
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 shrink-0 mt-0.5" />
                <span><strong>Bounded Sessions:</strong> Gentle rest prompts after 10–15 minutes ensure meaningful stimulation without cognitive fatigue.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 shrink-0 mt-0.5" />
                <span><strong>No Menus to Get Lost In:</strong> One large, high-contrast activity at a time. The elderly person simply swipes or taps next.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 shrink-0 mt-0.5" />
                <span><strong>Cognitive Domain Balancing:</strong> The AI engine alternates between personal memory, executive sequences, language recall, and attention.</span>
              </li>
            </ul>
          </div>

          {/* Interactive Feed Preview Card Mockup */}
          <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl relative">
            <div className="flex items-center justify-between text-xs text-stone-400 mb-4 pb-2 border-b border-stone-800">
              <span className="font-semibold text-amber-400">Live Feed Preview • Aita Mode</span>
              <span className="font-mono text-emerald-400">Card #1 Active</span>
            </div>

            <div className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-4">
              <div className="h-44 rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80"
                  alt="Sister Minati 1987"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-stone-900/80 text-[10px] text-amber-300 border border-amber-500/30">
                  Umananda Ferry, 1987
                </div>
              </div>

              <h4 className="font-serif font-bold text-lg text-stone-100 text-center">
                “Who was sitting with you on the river ferry to Umananda?”
              </h4>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-amber-600 text-white font-bold text-xs text-center shadow">
                  ✓ Minati (My Sister)
                </div>
                <div className="p-3 rounded-xl bg-stone-700 text-stone-300 font-medium text-xs text-center">
                  Sunita (Daughter)
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-[11px] text-stone-400">
                <span>Audio Instruction: 0.82x gentle pace</span>
                <span className="text-emerald-400 font-semibold">Dignified Affirmation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISUAL STORYTELLING & 5-MINUTE SIH DEMO JOURNEY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold">
            End-to-End System Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-50 mt-1 mb-3">
            The 5-Minute SIH Presentation Story
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light">
            How personal family memories are converted into structured therapeutic activities, tracked longitudinally, and reviewed by clinicians.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 font-bold font-mono text-sm flex items-center justify-center border border-amber-500/30">
              1
            </span>
            <h3 className="font-bold text-stone-100 text-base">Caregiver Uploads Memory</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Daughter Sunita uploads a 1987 photo of Aita with her sister Minati on the Brahmaputra ferry with tags and location.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-300 font-bold font-mono text-sm flex items-center justify-center border border-teal-500/30">
              2
            </span>
            <h3 className="font-bold text-stone-100 text-base">AI Structures Activity</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              The AI Personalization Engine creates a respectful recognition prompt with Assamese voice synthesis and dignified hints.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-300 font-bold font-mono text-sm flex items-center justify-center border border-rose-500/30">
              3
            </span>
            <h3 className="font-bold text-stone-100 text-base">Aita Mindfully Engages</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Aita recognizes her sister instantly via voice or large touch buttons. Positive emotional warmth sparks spontaneous song recall.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-3 relative">
            <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 font-bold font-mono text-sm flex items-center justify-center border border-indigo-500/30">
              4
            </span>
            <h3 className="font-bold text-stone-100 text-base">Longitudinal Telemetry</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Session closes after 12m. Performance metrics update caregiver dashboard and clinician portal without making medical diagnoses.
            </p>
          </div>
        </div>
      </section>

      {/* 5. TECHNICAL ARCHITECTURE & DATA FLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-stone-900 border border-stone-800 shadow-2xl space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              System Engineering & Data Flow
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-50 mt-1 mb-2">
              Technical Architecture & Personalization Engine
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed font-light">
              Designed as a privacy-preserving, decoupled cognitive pipeline bridging offline edge execution with cloud synchronization.
            </p>
          </div>

          {/* Clean Architecture Diagram Visual */}
          <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 font-mono text-xs text-stone-300 overflow-x-auto">
            <div className="min-w-[650px] space-y-6 text-center">
              <div className="inline-block p-3 rounded-xl bg-teal-950 border border-teal-700 text-teal-300 font-bold">
                FAMILY / CAREGIVER (Sunita) ➔ PERSONAL MEMORY VAULT
              </div>
              <div className="text-stone-500">↓ (Autobiographical Metadata & Media Graph)</div>
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="p-3 rounded-xl bg-stone-800 border border-stone-700 text-amber-300">
                  Cognitive AI (Domain Balance)
                </div>
                <div className="p-3 rounded-xl bg-stone-800 border border-stone-700 text-teal-300">
                  Language AI (Assamese / Bhashini)
                </div>
                <div className="p-3 rounded-xl bg-stone-800 border border-stone-700 text-rose-300">
                  Memory Graph (Family Ties)
                </div>
              </div>
              <div className="text-stone-500">↓</div>
              <div className="inline-block p-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-rose-600 text-white font-bold text-sm shadow-lg">
                BOUNDED THERAPEUTIC COGNITIVE FEED ENGINE (Edge + Local Cache)
              </div>
              <div className="text-stone-500">↓ (Zero-Friction Continuous Stream)</div>
              <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto">
                <div className="p-3 rounded-xl bg-stone-900 border border-amber-500/50 text-amber-200">
                  Aita Mode (Elderly Feed)
                  <span className="block text-[10px] text-stone-400 mt-1">Touch + Voice + Local Storage</span>
                </div>
                <div className="p-3 rounded-xl bg-stone-900 border border-teal-500/50 text-teal-200">
                  Caregiver Sanctuary
                  <span className="block text-[10px] text-stone-400 mt-1">Daily Summaries + Vault Manager</span>
                </div>
              </div>
              <div className="text-stone-500">↓ (Queued Telemetry Synchronization)</div>
              <div className="inline-block p-3 rounded-xl bg-indigo-950 border border-indigo-700 text-indigo-300 font-semibold">
                CLINICIAN PORTAL (Dr. Bhupen Sarma • ABDM / FHIR Telemetry)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPETITIVE DIFFERENTIATION MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-semibold">
            Market Comparison
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-50 mt-1 mb-2">
            How SmritiSetu Differs from Generic Brain Games
          </h2>
          <p className="text-stone-300 text-sm font-light">
            We are not building another gaming website. We are building a personalized cognitive care companion.
          </p>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-stone-800 bg-stone-900/90 shadow-xl">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-800 text-stone-200 uppercase tracking-wider text-[11px] font-mono">
              <tr>
                <th className="py-4 px-5">Capability / Dimension</th>
                <th className="py-4 px-5 text-amber-300 font-bold">SmritiSetu (Our Platform)</th>
                <th className="py-4 px-5 text-stone-400">Lumosity / Elevate</th>
                <th className="py-4 px-5 text-stone-400">MindMate / Constant Therapy</th>
                <th className="py-4 px-5 text-stone-400">Generic Quiz Apps</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              <tr className="hover:bg-stone-850">
                <td className="py-3.5 px-5 font-semibold text-stone-100">Interaction Metaphor</td>
                <td className="py-3.5 px-5 text-amber-300 font-bold">Bounded Therapeutic Stream</td>
                <td className="py-3.5 px-5 text-stone-400">Complex Game Menus</td>
                <td className="py-3.5 px-5 text-stone-400">SaaS Form Wizard</td>
                <td className="py-3.5 px-5 text-stone-400">Unbounded Social Feed</td>
              </tr>
              <tr className="hover:bg-stone-850">
                <td className="py-3.5 px-5 font-semibold text-stone-100">Autobiographical Memory Vault</td>
                <td className="py-3.5 px-5 text-amber-300 font-bold">Yes (Family Photos & Audio)</td>
                <td className="py-3.5 px-5 text-rose-400">No (Generic Stock Art)</td>
                <td className="py-3.5 px-5 text-stone-400">Limited Static Scrapbook</td>
                <td className="py-3.5 px-5 text-rose-400">None</td>
              </tr>
              <tr className="hover:bg-stone-850">
                <td className="py-3.5 px-5 font-semibold text-stone-100">NER Regional Localization</td>
                <td className="py-3.5 px-5 text-amber-300 font-bold">English, Hindi, Assamese prototype with expandable NER language architecture</td>
                <td className="py-3.5 px-5 text-stone-400">Often less localized for NER use cases</td>
                <td className="py-3.5 px-5 text-stone-400">Varies by product and market</td>
                <td className="py-3.5 px-5 text-stone-400">Generic Translations</td>
              </tr>
              <tr className="hover:bg-stone-850">
                <td className="py-3.5 px-5 font-semibold text-stone-100">Offline-First Resilience</td>
                <td className="py-3.5 px-5 text-amber-300 font-bold">Offline-ready core activities with sync queue</td>
                <td className="py-3.5 px-5 text-stone-400">Connectivity needs vary</td>
                <td className="py-3.5 px-5 text-stone-400">Connectivity needs vary</td>
                <td className="py-3.5 px-5 text-stone-400">Often online-dependent</td>
              </tr>
              <tr className="hover:bg-stone-850">
                <td className="py-3.5 px-5 font-semibold text-stone-100">Intergenerational Bridge</td>
                <td className="py-3.5 px-5 text-amber-300 font-bold">“Tell Me About Them” (Voice)</td>
                <td className="py-3.5 px-5 text-rose-400">None</td>
                <td className="py-3.5 px-5 text-rose-400">None</td>
                <td className="py-3.5 px-5 text-rose-400">None</td>
              </tr>
              <tr className="hover:bg-stone-850">
                <td className="py-3.5 px-5 font-semibold text-stone-100">Medical Safety & Ethics</td>
                <td className="py-3.5 px-5 text-amber-300 font-bold">Strict Non-Diagnostic Guardrails</td>
                <td className="py-3.5 px-5 text-stone-400">Wellness or training framing</td>
                <td className="py-3.5 px-5 text-stone-400">Clinical or rehabilitation framing</td>
                <td className="py-3.5 px-5 text-stone-400">Varies widely</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. RESPONSIBLE AI & ETHICS MANIFESTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-stone-900 to-stone-950 border border-amber-600/40 shadow-2xl">
          <div className="flex items-center space-x-3 mb-4">
            <ShieldCheck className="w-8 h-8 text-amber-400" />
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              Our Ethical Charter & Responsible AI Manifesto
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-xs text-stone-300">
            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-1">
              <span className="font-bold text-amber-300 text-sm block">1. We Do Not Diagnose</span>
              <p className="text-stone-400">
                We never claim that an algorithm diagnoses dementia or Alzheimer's. We provide supportive monitoring and variance alerts.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-1">
              <span className="font-bold text-teal-300 text-sm block">2. We Honor Caregivers</span>
              <p className="text-stone-400">
                AI does not replace human love or clinical judgment. It empowers family caregivers with objective visibility.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-1">
              <span className="font-bold text-rose-300 text-sm block">3. Zero Dark Patterns</span>
              <p className="text-stone-400">
                No compulsive streaks, no shame notifications, and no engagement-maximization at the cost of cognitive rest.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700/60 space-y-1">
              <span className="font-bold text-indigo-300 text-sm block">4. Data Sovereignty</span>
              <p className="text-stone-400">
                Family photographs, memories, and voice clips are encrypted, stored locally, and never monetized or sold.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION & SYSTEM EXPLORATION */}
      <section className="text-center max-w-4xl mx-auto px-4 space-y-6 pt-10">
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-stone-50">
          Ready to experience the cognitive feed?
        </h2>
        <p className="text-stone-300 text-base sm:text-lg max-w-xl mx-auto font-light">
          Experience how Aita engages with today’s memory journey in Tezpur, Assam.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setCurrentView('elderly')}
            className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold text-lg shadow-xl shadow-amber-950/40 transition-all"
          >
            Launch Live Aita Feed
          </button>

          <button
            onClick={() => setCurrentView('research')}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold text-base border border-stone-700 transition-colors"
          >
            Read SIH Research Dossier
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-800/80 pt-12 text-center text-xs text-stone-500 max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 mb-4 font-medium text-stone-400">
          <button onClick={() => setCurrentView('elderly')} className="hover:text-white">Aita Mode Feed</button>
          <button onClick={() => setCurrentView('caregiver')} className="hover:text-white">Caregiver Sanctuary</button>
          <button onClick={() => setCurrentView('clinician')} className="hover:text-white">Clinician Portal</button>
          <button onClick={() => setCurrentView('research')} className="hover:text-white">Research & Policy</button>
          <button onClick={toggleOfflineMode} className="hover:text-amber-300">
            {isOffline ? 'Switch to Online Mode' : 'Simulate Offline Mode'}
          </button>
        </div>
        <p className="max-w-2xl mx-auto leading-relaxed">
          SmritiSetu (স্মৃতি সেতু) • Developed for Smart India Hackathon (SIH) 2026. Designed to support cognitive wellbeing, reminiscence, and caregiver awareness in North-East India. Not a diagnostic medical device.
        </p>
        <p className="mt-2 text-stone-600">
          © 2026 SmritiSetu Platform • Assam • Meghalaya • North Eastern Region, India
        </p>
      </footer>
    </div>
  );
}
