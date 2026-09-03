'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  Activity,
  Brain,
  WifiOff,
  Wifi,
  HardDrive,
  CheckCircle2,
  ShieldCheck,
  TrendingDown,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

export default function AshaWorkerDashboard() {
  const { isOffline, toggleOfflineMode, syncQueue, setCurrentView } = useApp();

  // Mock 14-day longitudinal telemetry from remote ASHA health post in Tezpur, Assam
  const telemetryTrendData = [
    { day: 'Day 1', hesitationMs: 3100, tremorJitter: 1.42, stabilityScore: 82 },
    { day: 'Day 2', hesitationMs: 2950, tremorJitter: 1.38, stabilityScore: 84 },
    { day: 'Day 3', hesitationMs: 3050, tremorJitter: 1.40, stabilityScore: 83 },
    { day: 'Day 4', hesitationMs: 2880, tremorJitter: 1.35, stabilityScore: 85 },
    { day: 'Day 5', hesitationMs: 2920, tremorJitter: 1.36, stabilityScore: 85 },
    { day: 'Day 6', hesitationMs: 2800, tremorJitter: 1.30, stabilityScore: 87 },
    { day: 'Day 7', hesitationMs: 2840, tremorJitter: 1.28, stabilityScore: 88 },
    { day: 'Day 8', hesitationMs: 2790, tremorJitter: 1.25, stabilityScore: 88 },
    { day: 'Day 9', hesitationMs: 2850, tremorJitter: 1.27, stabilityScore: 87 },
    { day: 'Day 10', hesitationMs: 2740, tremorJitter: 1.22, stabilityScore: 89 },
    { day: 'Day 11', hesitationMs: 2780, tremorJitter: 1.24, stabilityScore: 88 },
    { day: 'Day 12', hesitationMs: 2710, tremorJitter: 1.20, stabilityScore: 90 },
    { day: 'Day 13', hesitationMs: 2680, tremorJitter: 1.18, stabilityScore: 91 },
    { day: 'Day 14 (Today)', hesitationMs: 2640, tremorJitter: 1.15, stabilityScore: 92 }
  ];

  const domainScores = [
    { domain: 'Visual Reminiscence', score: 92, fill: '#f59e0b' },
    { domain: 'Auditory Folk Recall', score: 88, fill: '#10b981' },
    { domain: 'Acoustic Naming', score: 85, fill: '#06b6d4' },
    { domain: 'Family Connection', score: 96, fill: '#ec4899' }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-teal-500/40 shadow-2xl">
        <div>
          <div className="flex items-center space-x-3">
            <span className="p-2.5 rounded-2xl bg-teal-500/20 border border-teal-400 text-teal-300">
              <Activity className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Caregiver & ASHA Worker Telemetry Console
              </h1>
              <p className="text-xs sm:text-sm text-teal-300">
                Community Health Monitoring • Patient: Anima Devi (72 yrs, Tezpur, Assam)
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentView('elderly')}
            className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-xl transition-all cursor-pointer transform active:scale-95"
          >
            ← Return to Patient Stream
          </button>
        </div>
      </div>

      {/* 3 Core Clinical Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric 1: Average Hesitation Time */}
        <div className="p-6 rounded-3xl bg-slate-900 border-2 border-amber-400/50 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-amber-300 font-mono uppercase tracking-wider">
            <span>Average Hesitation Time</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-4xl font-black font-mono text-amber-400">
            2,640 <span className="text-lg font-normal text-slate-300">ms</span>
          </div>
          <p className="text-xs text-emerald-400 flex items-center font-medium">
            <TrendingDown className="w-3.5 h-3.5 mr-1" />
            -460 ms change across past 14 demo days (supportive trend signal)
          </p>
          <p className="text-[11px] text-slate-400 pt-1">
            Prototype indicator only: review persistent changes with a qualified professional.
          </p>
        </div>

        {/* Metric 2: Vocal Tremor Jitter */}
        <div className="p-6 rounded-3xl bg-slate-900 border-2 border-teal-400/50 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-teal-300 font-mono uppercase tracking-wider">
            <span>Vocal Tremor Jitter</span>
            <Activity className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-4xl font-black font-mono text-teal-300">
            1.15 <span className="text-lg font-normal text-slate-300">%</span>
          </div>
          <p className="text-xs text-emerald-400 flex items-center font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            Within this patient's simulated baseline range
          </p>
          <p className="text-[11px] text-slate-400 pt-1">
            Voice feature is a demo telemetry signal, not a diagnostic biomarker.
          </p>
        </div>

        {/* Metric 3: Cognitive Stability Score */}
        <div className="p-6 rounded-3xl bg-slate-900 border-2 border-emerald-400/50 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-emerald-300 font-mono uppercase tracking-wider">
            <span>Cognitive Stability Score</span>
            <Brain className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-4xl font-black font-mono text-emerald-300">
            92 <span className="text-lg font-normal text-slate-300">%</span>
          </div>
          <p className="text-xs text-emerald-400 flex items-center font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            Strong engagement with autobiographical Assam stimuli
          </p>
          <p className="text-[11px] text-slate-400 pt-1">
            Composite score across visual match, folk melody recall, and family connection.
          </p>
        </div>
      </div>

      {/* Recharts 14-Day Longitudinal Hesitation Chart */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-slate-700/80 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-white">
              14-Day Response Hesitation Latency (ms)
            </h3>
            <p className="text-xs text-slate-400">
              Monitored by ASHA health workers during home visits in Sonitpur district
            </p>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-mono">
            Steady Improvement Trajectory
          </span>
        </div>

        <div className="h-64 sm:h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={telemetryTrendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="hesitationGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[2000, 3500]} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#f59e0b',
                  borderRadius: '1rem',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Area
                type="monotone"
                dataKey="hesitationMs"
                name="Hesitation (ms)"
                stroke="#f59e0b"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#hesitationGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Offline-First Architecture Section (Crucial for Low-Connectivity NER) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-amber-500/50 shadow-2xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-amber-300">
              Offline-First PWA Resilience Architecture (Low-Connectivity NER)
            </h3>
            <p className="text-xs text-slate-300">
              How SmritiSetu survives in remote, hilly, and shadow zones of Northeast India
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs leading-relaxed text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h4 className="font-bold text-yellow-300 text-sm mb-1">1. Local SQLite / IndexedDB</h4>
            <p className="text-slate-400">
              All 4 paced stream interactions, audio synthesizers, family photos, and transcribed voice biomarkers are stored locally on the patient’s tablet.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h4 className="font-bold text-yellow-300 text-sm mb-1">2. Queued Change Telemetry</h4>
            <p className="text-slate-400">
              When Aita completes reminiscence cards without internet, hesitation latency and voice jitter are safely staged in the offline sync queue.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
            <h4 className="font-bold text-yellow-300 text-sm mb-1">3. Automated Cloud Sync</h4>
            <p className="text-slate-400">
              The moment 4G or clinic Wi-Fi returns, the prototype syncs queued records to a consent-controlled cloud endpoint.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
          <div className="flex items-center space-x-2">
            {isOffline ? (
              <span className="inline-flex items-center text-amber-400 font-bold">
                <WifiOff className="w-4 h-4 mr-1.5" /> Offline Mode Active • Local SQLite/IndexedDB Active
              </span>
            ) : (
              <span className="inline-flex items-center text-emerald-400 font-bold">
                <Wifi className="w-4 h-4 mr-1.5" /> Cloud Synchronization Active (Demo Endpoint Connected)
              </span>
            )}
          </div>
          <button
            onClick={toggleOfflineMode}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-yellow-300 border border-yellow-400/40 font-bold cursor-pointer transition-colors"
          >
            {isOffline ? 'Test Cloud Reconnect' : 'Simulate Hilltop Offline'}
          </button>
        </div>
      </div>

      {/* Clinical Evidence & Pitch Deck Section (Tovertafel + Sea Hero Quest Inspiration) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-indigo-500/40 shadow-2xl space-y-4">
        <div className="flex items-center space-x-2 text-indigo-400 font-mono text-xs uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Clinical Framework for SIH 2026 Pitch Deck</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
          Clinical Rationale: Inspired by Sensory Dementia Design and Research Games
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed font-light">
          SmritiSetu borrows careful design lessons from sensory dementia tools and large-scale cognitive research games, then localizes the interaction model for North-Eastern communities:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed pt-2">
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-700/60">
            <h4 className="font-bold text-indigo-200 text-sm mb-1">Tovertafel (Magic Table, Netherlands) Principle</h4>
            <p className="text-slate-300">
              Sensory, non-punitive interactions can support participation and reduce distress for some people living with dementia. SmritiSetu translates that lesson into a tactile, snap-scroll "Paced Reminiscence Stream" with one calm activity at a time.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-700/60">
            <h4 className="font-bold text-indigo-200 text-sm mb-1">Sea Hero Quest (UCL / Alzheimer's UK) Principle</h4>
            <p className="text-slate-300">
              Research games show how interaction signals can support population-scale cognitive research. SmritiSetu uses hesitation time and voice interaction as supportive monitoring signals, pending formal validation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
