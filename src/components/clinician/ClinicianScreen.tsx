'use client';

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ChangeDetectionAlerts from './ChangeDetectionAlerts';
import ClinicalReportModal from './ClinicalReportModal';
import {
  Stethoscope,
  TrendingUp,
  FileText,
  Calendar,
  Activity,
  CheckCircle2,
  Shield,
  Clock,
  Heart
} from 'lucide-react';

export default function ClinicianScreen() {
  const { patient, cognitiveProfile, attempts, setCurrentView } = useApp();
  const [isReportOpen, setIsReportOpen] = useState(false);

  const longitudinalTrends = cognitiveProfile.longitudinalTrends;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Clinician Portal Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-stone-900 border border-stone-800 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
            <Stethoscope className="w-7 h-7 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-indigo-100">
                Clinician Insights Portal
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/60 font-medium">
                {patient.clinicianName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 mt-0.5">
              Longitudinal Cognitive Engagement Telemetry • {patient.careCenter}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsReportOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center space-x-1.5 shadow-md"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Clinical Brief</span>
          </button>

          <button
            onClick={() => setCurrentView('elderly')}
            className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs border border-stone-700 transition-colors flex items-center space-x-1.5"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Patient Feed View</span>
          </button>
        </div>
      </div>

      {/* Change Detection Alerts */}
      <ChangeDetectionAlerts />

      {/* Longitudinal Trend Visualizer */}
      <div className="bg-stone-900/90 rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-800">
          <div>
            <h3 className="font-serif font-bold text-xl text-stone-100">
              Longitudinal Cognitive Trajectory (Past 6 Weeks)
            </h3>
            <p className="text-xs text-stone-400">
              Tracking stability in memory, language, and executive reasoning across bounded sessions
            </p>
          </div>
          <div className="flex items-center space-x-4 text-xs">
            <span className="flex items-center text-amber-400">
              <span className="w-3 h-3 rounded-full bg-amber-400 mr-1.5 inline-block" />
              Memory
            </span>
            <span className="flex items-center text-teal-400">
              <span className="w-3 h-3 rounded-full bg-teal-400 mr-1.5 inline-block" />
              Language
            </span>
            <span className="flex items-center text-rose-400">
              <span className="w-3 h-3 rounded-full bg-rose-400 mr-1.5 inline-block" />
              Orientation
            </span>
          </div>
        </div>

        {/* Responsive Longitudinal Bar Chart */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {longitudinalTrends.map((weekData) => (
            <div
              key={weekData.week}
              className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/60 flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-stone-400 block mb-3">
                  {weekData.week}
                </span>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-amber-300 font-mono mb-0.5">
                      <span>Memory</span>
                      <span>{weekData.memoryScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-700 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${weekData.memoryScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-teal-300 font-mono mb-0.5">
                      <span>Language</span>
                      <span>{weekData.languageScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-700 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-400 rounded-full" style={{ width: `${weekData.languageScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-rose-300 font-mono mb-0.5">
                      <span>Orientation</span>
                      <span>{weekData.orientationScore}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-700 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-400 rounded-full" style={{ width: `${weekData.orientationScore}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-2 border-t border-stone-700/40 text-[10px] text-stone-400 text-center font-mono">
                Avg Hesitation: 3.2s
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Session Attempt Telemetry Log */}
      <div className="bg-stone-900/90 rounded-3xl p-6 border border-stone-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            <h3 className="font-serif font-bold text-lg text-stone-100">
              Live Interaction Attempt Telemetry
            </h3>
          </div>
          <span className="text-xs text-stone-400">
            {attempts.length} attempts recorded this session
          </span>
        </div>

        {attempts.length === 0 ? (
          <div className="p-8 rounded-2xl bg-stone-800/40 text-center text-xs text-stone-400">
            No live attempts yet in this active session. Launch Aita Mode to test real interaction telemetry.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-300">
              <thead>
                <tr className="border-b border-stone-800 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Time</th>
                  <th className="py-2.5 px-3">Domain</th>
                  <th className="py-2.5 px-3">Activity Type</th>
                  <th className="py-2.5 px-3">Outcome</th>
                  <th className="py-2.5 px-3">Hesitation</th>
                  <th className="py-2.5 px-3">Voice Used</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 font-mono">
                {attempts.slice(-6).map((att) => (
                  <tr key={att.id} className="hover:bg-stone-800/40">
                    <td className="py-2 px-3 text-stone-400">{att.timestamp}</td>
                    <td className="py-2 px-3 text-stone-200 capitalize">{att.domain}</td>
                    <td className="py-2 px-3 text-stone-300 font-sans">{att.type.replace('_', ' ')}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        att.outcome === 'recalled'
                          ? 'bg-emerald-950 text-emerald-300'
                          : 'bg-amber-950 text-amber-300'
                      }`}>
                        {att.outcome}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-stone-300">{att.hesitationSeconds}s</td>
                    <td className="py-2 px-3">{att.voiceUsed ? 'Yes (Speech API)' : 'Touch'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Clinical Report Export Modal */}
      <ClinicalReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </div>
  );
}
