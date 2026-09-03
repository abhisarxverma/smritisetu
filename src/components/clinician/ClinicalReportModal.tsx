'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, Download, CheckCircle2, Shield } from 'lucide-react';

interface ClinicalReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClinicalReportModal({ isOpen, onClose }: ClinicalReportModalProps) {
  const { patient, cognitiveProfile, caregiverObservations } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-stone-900 border border-stone-700 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto text-stone-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-semibold">
                SUPPORTIVE REVIEW BRIEF #DEMO-NER-2026-088
              </span>
              <span className="text-xs text-stone-400">Date: {new Date().toLocaleDateString()}</span>
            </div>
            <h3 className="text-xl font-serif font-bold text-stone-100 mt-1">
              Cognitive Engagement & Telemetry Briefing
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Patient Demo Demographics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5 p-4 rounded-2xl bg-stone-800/80 text-xs border border-stone-700/60">
          <div>
            <span className="text-stone-400 block">Patient Name:</span>
            <span className="font-bold text-stone-200">{patient.name}</span>
          </div>
          <div>
            <span className="text-stone-400 block">Age / Gender:</span>
            <span className="font-bold text-stone-200">{patient.age} yrs / Female</span>
          </div>
          <div>
            <span className="text-stone-400 block">Location:</span>
            <span className="font-bold text-stone-200">{patient.location}</span>
          </div>
          <div>
            <span className="text-stone-400 block">Reviewing Professional:</span>
            <span className="font-bold text-indigo-300">{patient.clinicianName}</span>
          </div>
        </div>

        {/* Longitudinal Domain Matrix */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Current Cognitive Engagement Composite
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {Object.entries(cognitiveProfile.domains).map(([domain, data]) => (
              <div key={domain} className="p-3 rounded-xl bg-stone-800/50 border border-stone-700/50">
                <span className="text-stone-400 block capitalize">{domain.replace('_', ' ')}</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-lg font-bold font-mono text-stone-100">{data.score}%</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    data.trend === 'improving' ? 'bg-emerald-950 text-emerald-300' : 'bg-stone-700 text-stone-300'
                  }`}>
                    {data.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clinician Summary */}
        <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-700/50 text-xs space-y-2 mb-6">
          <h4 className="font-bold text-indigo-200 uppercase tracking-wider text-[11px]">
            Supportive Summary & Change Telemetry:
          </h4>
          <p className="text-stone-200 leading-relaxed">
            Demo profile shows sustained engagement with bounded 12-15 minute daily sessions. Autobiographical memory and familiar sequence activities are strong in this sample data. A mild orientation hesitation change is visible; consider professional review if this pattern persists across real sessions. This is not diagnostic or treatment guidance.
          </p>
        </div>

        {/* Caregiver Observation Highlights */}
        <div className="space-y-2 mb-6 text-xs">
          <h4 className="font-semibold uppercase tracking-wider text-stone-400">
            Caregiver Notes (Sunita Baruah)
          </h4>
          {caregiverObservations.slice(0, 2).map(obs => (
            <div key={obs.id} className="p-2.5 rounded-xl bg-stone-800/60 border border-stone-700 text-stone-300">
              <span className="text-[10px] text-stone-400 block">{obs.timestamp}</span>
              <p>{obs.content}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-800 text-xs">
          <span className="text-stone-400">Future ABDM-aligned export concept; no real ABHA or health record is created.</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => alert('Demo supportive brief export prepared. This prototype does not create a certified clinical record.')}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center space-x-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF Brief</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
