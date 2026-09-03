'use client';

import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Info, Stethoscope } from 'lucide-react';

export default function ChangeDetectionAlerts() {
  return (
    <div className="bg-stone-900/90 rounded-3xl p-6 border border-stone-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-stone-800">
        <div className="flex items-center space-x-2">
          <Stethoscope className="w-5 h-5 text-indigo-400" />
          <h3 className="font-serif font-bold text-lg text-stone-100">
            Automated Variance & Change Detection Engine
          </h3>
        </div>
        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/50">
          Algorithmic Telemetry Surveillance
        </span>
      </div>

      {/* Flag 1: Subtle Orientation Variation */}
      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/60 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-amber-200 flex items-center">
            <AlertTriangle className="w-4 h-4 mr-1.5 text-amber-400 shrink-0" />
            Observed Temporal Variance • Orientation Domain
          </span>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-900/60 px-2 py-0.5 rounded">
            Hesitation Index: +1.2s
          </span>
        </div>
        <p className="text-stone-300 leading-relaxed">
          A persistent change in orientation response duration has been observed over the preceding 14-day window (average response shifted from 2.6s to 3.8s). Semantic language and personal memory recall remain exceptionally stable.
        </p>
        <div className="p-2.5 rounded-xl bg-stone-900/60 border border-amber-800/40 text-amber-300 font-medium">
          Clinical Guidance: Consider routine professional assessment during next Tezpur outreach clinic. Recommend maintaining bounded morning reminiscence activities.
        </div>
      </div>

      {/* Flag 2: Positive Reminiscence Stability */}
      <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 text-xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-emerald-200 flex items-center">
            <CheckCircle className="w-4 h-4 mr-1.5 text-emerald-400 shrink-0" />
            Autobiographical Stability • High Emotional Valence
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-900/60 px-2 py-0.5 rounded">
            Accuracy: 92%
          </span>
        </div>
        <p className="text-stone-300 leading-relaxed">
          Photo-based recall involving sister Minati and traditional Assamese handloom crafts continues to demonstrate low hesitation (&lt; 2.2s) and high positive engagement.
        </p>
      </div>

      <p className="text-[10px] text-stone-400 italic">
        * Ethical Medical Guardrail: SmritiSetu does not provide clinical diagnoses. Telemetry alerts are intended for supportive clinical awareness and early lifestyle adaptation.
      </p>
    </div>
  );
}
