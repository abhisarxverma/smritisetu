'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import CaregiverOverview from './CaregiverOverview';
import MemoryVaultManager from './MemoryVaultManager';
import IntergenerationalPrompts from './IntergenerationalPrompts';
import AshaWorkerDashboard from './AshaWorkerDashboard';
import { Users, BookOpen, Heart, ArrowLeft, Shield, Sliders, Activity } from 'lucide-react';

export default function CaregiverScreen() {
  const { patient, setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<'asha' | 'overview' | 'vault' | 'intergenerational'>('asha');

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Top Caregiver Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-600/20 border border-teal-500/30 flex items-center justify-center shrink-0">
            <Users className="w-7 h-7 text-teal-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-teal-100">
                Caregiver & ASHA Worker Sanctuary
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-700/60 font-medium">
                Community Health Post • Sonitpur
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
              Supporting {patient.name} ({patient.honorific}) • {patient.location}, {patient.region}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentView('elderly')}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs transition-colors shadow-md flex items-center space-x-1.5 cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 fill-stone-950" />
            <span>Launch Paced Reminiscence Stream</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-stone-800 pb-2">
        <button
          onClick={() => setActiveTab('asha')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
            activeTab === 'asha'
              ? 'bg-teal-600 text-white shadow-md'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>ASHA Clinical Telemetry (Hesitation & Jitter)</span>
        </button>
        <button
          onClick={() => setActiveTab('vault')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'vault'
              ? 'bg-amber-600 text-stone-950 shadow-md font-bold'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
          }`}
        >
          Personal Memory Vault
        </button>
        <button
          onClick={() => setActiveTab('intergenerational')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'intergenerational'
              ? 'bg-rose-700 text-white shadow-md'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
          }`}
        >
          Intergenerational Bridge
        </button>
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-stone-700 text-white shadow-md'
              : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
          }`}
        >
          Daily Summary & Observations
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'asha' && <AshaWorkerDashboard />}
      {activeTab === 'vault' && <MemoryVaultManager />}
      {activeTab === 'intergenerational' && <IntergenerationalPrompts />}
      {activeTab === 'overview' && <CaregiverOverview />}
    </div>
  );
}

