'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  FileCheck,
  Globe,
  Award,
  Shield,
  Layers,
  HeartHandshake,
  TrendingUp,
  Cpu,
  ArrowRight
} from 'lucide-react';

export default function ResearchScreen() {
  const { setCurrentView } = useApp();

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-12 animate-fade-in text-stone-100">
      {/* Research Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 border border-stone-800 shadow-2xl">
        <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>SIH 2026 Solution Architecture & Evidence Dossier</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100 mb-3">
          Clinical Evidence, Policy Alignment & Research Foundation
        </h1>
        <p className="text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed font-light">
          An authoritative compilation of epidemiological data, Cognitive Stimulation Therapy (CST) principles, North-Eastern regional disparities, UN SDG mapping, and India’s Viksit Bharat 2047 digital health infrastructure.
        </p>
      </div>

      {/* 1. Problem Evidence & Epidemiological Landscape */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-rose-400 font-semibold text-sm">
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          <span>1. Epidemiological Evidence & The North-East Gap</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
            <span className="text-3xl font-mono font-bold text-rose-400">8.8 Million</span>
            <h3 className="font-bold text-stone-200 text-sm mt-1 mb-2">Projected Dementia Cases by 2036</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              According to the Longitudinal Ageing Study in India (LASI) and the Dementia India Report, dementia prevalence among Indians aged 60+ is ~7.4%, growing exponentially with demographic ageing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
            <span className="text-3xl font-mono font-bold text-amber-400">&lt; 0.1%</span>
            <h3 className="font-bold text-stone-200 text-sm mt-1 mb-2">Geriatric Specialists in NER</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Tertiary memory clinics in the North Eastern Region are concentrated exclusively in a few cities (Guwahati, Dibrugarh, Shillong), leaving remote hill communities with virtually zero geriatric assessment.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800">
            <span className="text-3xl font-mono font-bold text-teal-400">82%</span>
            <h3 className="font-bold text-stone-200 text-sm mt-1 mb-2">Informal Female Caregiver Burden</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Over four-fifths of dementia care in India is provided by daughters and daughters-in-law without structured respite, psychological tools, or objective tracking metrics.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Clinical Foundations: CST & Reminiscence Therapy */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-teal-400 font-semibold text-sm">
          <span className="w-2 h-2 rounded-full bg-teal-400" />
          <span>2. Clinical Methodology: Cognitive Stimulation & Reminiscence</span>
        </div>
        <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 text-sm leading-relaxed text-stone-300">
          <p>
            SmritiSetu’s activity taxonomy is grounded in evidence-based psychosocial interventions recognized by the World Health Organization (WHO) and UK NICE Clinical Guidelines:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/60">
              <h4 className="font-bold text-stone-100 mb-1">Cognitive Stimulation Therapy (CST)</h4>
              <p className="text-xs text-stone-400">
                Developed by Spector et al. (2003), CST uses themed activities (food preparation, language categorisation, sound recognition) to stimulate executive pathways without right/wrong anxiety. SmritiSetu adapts this digitally into bounded sequential cards.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/60">
              <h4 className="font-bold text-stone-100 mb-1">Autobiographical Reminiscence Therapy</h4>
              <p className="text-xs text-stone-400">
                Remote episodic memories remain neurologically preserved longer than short-term retention in mild-to-moderate dementia. Linking family photos and cultural artifacts (Japi, Xorai, Bihu) anchors emotional stability and reinforces self-identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. UN Sustainable Development Goals (SDGs) Mapping */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 font-semibold text-sm">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>3. United Nations Sustainable Development Goals (SDG Alignment)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold font-mono">
              SDG 3 • Target 3.4
            </span>
            <h4 className="font-bold text-stone-100 text-sm">Good Health & Well-Being</h4>
            <p className="text-stone-400">
              Promoting mental health, healthy cognitive ageing, and non-communicable disease supportive interventions for elderly populations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold font-mono">
              SDG 5 • Target 5.4
            </span>
            <h4 className="font-bold text-stone-100 text-sm">Gender Equality & Unpaid Care</h4>
            <p className="text-stone-400">
              Recognizing and reducing the disproportionate informal caregiving burden carried by women in Indian families through structured monitoring tools.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold font-mono">
              SDG 10 • Target 10.2
            </span>
            <h4 className="font-bold text-stone-100 text-sm">Reduced Inequalities</h4>
            <p className="text-stone-400">
              Empowering remote and linguistically underserved elderly citizens in North-East India who are excluded from Western, English-only digital apps.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
            <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold font-mono">
              SDG 9 • Target 9.c
            </span>
            <h4 className="font-bold text-stone-100 text-sm">Industry, Innovation & Infrastructure</h4>
            <p className="text-stone-400">
              Responsible AI algorithms engineered for low-connectivity, offline-first digital public health delivery.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
            <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold font-mono">
              SDG 11 • Target 11.7
            </span>
            <h4 className="font-bold text-stone-100 text-sm">Sustainable Age-Friendly Communities</h4>
            <p className="text-stone-400">
              Fostering intergenerational living, preserving community oral histories, and keeping elders connected to family roots.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
            <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold font-mono">
              SDG 17 • Target 17.6
            </span>
            <h4 className="font-bold text-stone-100 text-sm">Partnerships for the Goals</h4>
            <p className="text-stone-400">
              Collaborations with GMCH, NEIGRIHMS, state health missions, and civil society organizations.
            </p>
          </div>
        </div>
      </section>

      {/* 4. India Policy & Viksit Bharat 2047 Alignment */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-sm">
          <span className="w-2 h-2 rounded-full bg-indigo-400" />
          <span>4. National Vision: India 2030 SDGs & Viksit Bharat 2047</span>
        </div>
        <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 text-xs leading-relaxed text-stone-300">
          <p className="text-sm text-stone-200">
            SmritiSetu aligns with official Government of India strategic pillars:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700">
              <h4 className="font-bold text-amber-300 text-sm mb-1">Ayushman Bharat Digital Mission (ABDM)</h4>
              <p className="text-stone-400">
                Longitudinal cognitive performance telemetry is architected for export via FHIR-compliant electronic health records (EHR) linked with ABHA (Ayushman Bharat Health Account) IDs.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700">
              <h4 className="font-bold text-teal-300 text-sm mb-1">Bhashini (National Language Translation Mission)</h4>
              <p className="text-stone-400">
                Voice-first architecture prepared for seamless integration with Bhashini speech-to-text and text-to-speech models across North-Eastern languages (Assamese, Bodo, Manipuri).
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700">
              <h4 className="font-bold text-rose-300 text-sm mb-1">Atal Vayo Abhyuday Yojana (AVAY)</h4>
              <p className="text-stone-400">
                Ministry of Social Justice and Empowerment initiative for senior citizen welfare, active ageing, and combating elderly isolation in tier-2/3 and rural areas.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700">
              <h4 className="font-bold text-sky-300 text-sm mb-1">AI for India (NITI Aayog National AI Strategy)</h4>
              <p className="text-stone-400">
                Demonstrates "AI for Public Good" through responsible, explainable, and privacy-preserving machine learning tailored for marginalized demographic groups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Future Validation & Clinical Roadmap */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>5. Rigorous Multi-Stage Clinical Validation Roadmap</span>
        </div>
        <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-center font-mono">
            <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-300 w-full">
              Phase 1: Working Prototype (SIH 2026)
            </div>
            <span className="text-stone-500 hidden md:inline">→</span>
            <div className="p-3 rounded-xl bg-stone-800 border border-stone-700 text-stone-300 w-full">
              Phase 2: Formal Usability Study (30 NER Families)
            </div>
            <span className="text-stone-500 hidden md:inline">→</span>
            <div className="p-3 rounded-xl bg-stone-800 border border-stone-700 text-stone-300 w-full">
              Phase 3: Institutional Pilot (GMCH / NEIGRIHMS)
            </div>
            <span className="text-stone-500 hidden md:inline">→</span>
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 w-full">
              Phase 4: Longitudinal Clinical Trial
            </div>
          </div>
          <p className="text-[11px] text-stone-400 mt-4 text-center">
            SmritiSetu makes no premature medical efficacy claims. The platform progresses ethically from human-centered usability testing to institutional clinical trials.
          </p>
        </div>
      </section>

      {/* Return to Live Experience */}
      <div className="text-center pt-4">
        <button
          onClick={() => setCurrentView('elderly')}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold text-base shadow-xl shadow-amber-950/40 inline-flex items-center space-x-2 transition-all"
        >
          <span>Experience the Live Platform (Aita Mode)</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
