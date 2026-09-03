'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  UserRole,
  LanguageCode,
  DemoPatientProfile,
  MemoryItem,
  FeedActivity,
  ActivityAttempt,
  CognitiveProfile,
  IntergenerationalMessage,
  CaregiverObservation,
  SyncQueueItem,
  ActivityDifficulty
} from '../data/types';
import {
  DEMO_PATIENT,
  INITIAL_MEMORIES,
  INITIAL_INTERGENERATIONAL_MESSAGES,
  INITIAL_CAREGIVER_OBSERVATIONS,
  INITIAL_COGNITIVE_PROFILE
} from '../data/demoPatientData';
import { INITIAL_ACTIVITIES } from '../data/initialActivities';
import { CognitiveFeedEngine } from '../lib/feedAlgorithm';
import { audioService } from '../lib/audioService';

interface AppContextType {
  // Navigation & Role
  currentView: 'landing' | 'elderly' | 'caregiver' | 'clinician' | 'research';
  setCurrentView: (view: 'landing' | 'elderly' | 'caregiver' | 'clinician' | 'research') => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;

  // Patient & Clinical Data
  patient: DemoPatientProfile;
  memories: MemoryItem[];
  addMemory: (memory: Omit<MemoryItem, 'id' | 'dateAdded' | 'approvedByCaregiver'>) => void;
  deleteMemory: (id: string) => void;
  updateMemory: (id: string, updated: Partial<MemoryItem>) => void;
  intergenerationalMessages: IntergenerationalMessage[];
  addIntergenerationalMessage: (msg: Omit<IntergenerationalMessage, 'id' | 'dateSent' | 'status'>) => void;
  answerIntergenerationalMessage: (id: string, response: string) => void;
  caregiverObservations: CaregiverObservation[];
  addCaregiverObservation: (note: string, flagChange: boolean) => void;
  cognitiveProfile: CognitiveProfile;

  // Feed & Activity Engine
  currentActivity: FeedActivity;
  feedIndex: number;
  attempts: ActivityAttempt[];
  recordAttempt: (outcome: 'recalled' | 'assisted' | 'skipped' | 'rested', hesitationSeconds: number, voiceUsed: boolean, assistance: boolean) => void;
  advanceToNextActivity: () => void;
  feedExplainability: string;
  currentDifficulty: ActivityDifficulty;
  isRestRecommended: boolean;
  dismissRestPrompt: () => void;

  // Bounded Session Pacing
  sessionSeconds: number;
  sessionLimitMinutes: number;
  setSessionLimitMinutes: (mins: number) => void;
  isSessionCompleted: boolean;
  completeSession: () => void;
  resetSession: () => void;

  // Offline Simulation & Sync
  isOffline: boolean;
  toggleOfflineMode: () => void;
  syncQueue: SyncQueueItem[];
  forceSyncQueue: () => void;

  // Accessibility & Audio
  isAudioMuted: boolean;
  toggleAudioMute: () => void;
  fontSizeScale: number; // 1.0, 1.2, 1.4
  setFontSizeScale: (scale: number) => void;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  isVoiceListening: boolean;
  simulatedSpeechText: string;
  startVoiceListening: (onTranscript: (text: string) => void) => void;
  stopVoiceListening: () => void;
  speakPrompt: (text: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Navigation
  const [currentView, setCurrentView] = useState<'landing' | 'elderly' | 'caregiver' | 'clinician' | 'research'>('landing');
  const [language, setLanguage] = useState<LanguageCode>('en');

  // Patient & Clinical Data
  const [patient] = useState<DemoPatientProfile>(DEMO_PATIENT);
  const [memories, setMemories] = useState<MemoryItem[]>(INITIAL_MEMORIES);
  const [intergenerationalMessages, setIntergenerationalMessages] = useState<IntergenerationalMessage[]>(INITIAL_INTERGENERATIONAL_MESSAGES);
  const [caregiverObservations, setCaregiverObservations] = useState<CaregiverObservation[]>(INITIAL_CAREGIVER_OBSERVATIONS);
  const [cognitiveProfile, setCognitiveProfile] = useState<CognitiveProfile>(INITIAL_COGNITIVE_PROFILE);

  // Activities & Feed
  const [activities, setActivities] = useState<FeedActivity[]>(INITIAL_ACTIVITIES);
  const [completedActivityIds, setCompletedActivityIds] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<ActivityAttempt[]>([]);
  const [currentActivity, setCurrentActivity] = useState<FeedActivity>(INITIAL_ACTIVITIES[0]);
  const [feedIndex, setFeedIndex] = useState<number>(0);
  const [currentDifficulty, setCurrentDifficulty] = useState<ActivityDifficulty>('gentle');
  const [feedExplainability, setFeedExplainability] = useState<string>(
    'Selected initial Personal Photo Memory: Anchors emotional security with family roots in Guwahati & Tezpur.'
  );
  const [isRestRecommended, setIsRestRecommended] = useState<boolean>(false);

  // Session Pacing (Bounded Session)
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);
  const [sessionLimitMinutes, setSessionLimitMinutes] = useState<number>(15);
  const [isSessionCompleted, setIsSessionCompleted] = useState<boolean>(false);

  // Offline Simulation & Queue
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [syncQueue, setSyncQueue] = useState<SyncQueueItem[]>([]);

  // Accessibility & Audio
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [fontSizeScale, setFontSizeScale] = useState<number>(1.0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [isVoiceListening, setIsVoiceListening] = useState<boolean>(false);
  const [simulatedSpeechText, setSimulatedSpeechText] = useState<string>('');

  // Timer for elderly session bounded tracking
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (currentView === 'elderly' && !isSessionCompleted) {
      interval = setInterval(() => {
        setSessionSeconds(prev => {
          const next = prev + 1;
          if (next >= sessionLimitMinutes * 60 && !isRestRecommended) {
            setIsRestRecommended(true);
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentView, isSessionCompleted, sessionLimitMinutes, isRestRecommended]);

  // Audio mute toggle
  const toggleAudioMute = useCallback(() => {
    const nextState = audioService.toggleMute();
    setIsAudioMuted(nextState);
  }, []);

  // Offline Mode toggle
  const toggleOfflineMode = useCallback(() => {
    setIsOffline(prev => {
      const next = !prev;
      if (!next && syncQueue.length > 0) {
        // Automatically sync queued items when reconnected
        setSyncQueue(q => q.map(item => ({ ...item, status: 'synced' })));
        audioService.playGentleChime('success');
      }
      return next;
    });
  }, [syncQueue]);

  const forceSyncQueue = useCallback(() => {
    setSyncQueue(q => q.map(item => ({ ...item, status: 'synced' })));
    audioService.playGentleChime('success');
  }, []);

  // Speak prompt aloud
  const speakPrompt = useCallback((text: string) => {
    audioService.speakText(text, language === 'as' ? 'as' : language === 'hi' ? 'hi' : 'en');
  }, [language]);

  // Advance to next activity via AI Cognitive Feed Engine
  const advanceToNextActivity = useCallback(() => {
    const elapsedMins = Math.floor(sessionSeconds / 60);
    const result = CognitiveFeedEngine.selectNextActivity({
      attempts,
      availableActivities: activities,
      memories,
      currentDifficulty,
      sessionMinutes: elapsedMins,
      sessionLimitMinutes,
      completedActivityIds
    });

    setCurrentActivity(result.nextActivity);
    setFeedExplainability(result.reason);
    setCurrentDifficulty(result.adaptedDifficulty);
    setIsRestRecommended(result.isRestRecommended);
    setFeedIndex(prev => prev + 1);

    audioService.playGentleChime('transition');
  }, [attempts, activities, memories, currentDifficulty, sessionSeconds, sessionLimitMinutes, completedActivityIds]);

  // Record Attempt
  const recordAttempt = useCallback((
    outcome: 'recalled' | 'assisted' | 'skipped' | 'rested',
    hesitationSeconds: number,
    voiceUsed: boolean,
    assistance: boolean
  ) => {
    const newAttempt: ActivityAttempt = {
      id: `att-${Date.now()}`,
      activityId: currentActivity.id,
      domain: currentActivity.domain,
      type: currentActivity.type,
      timestamp: new Date().toLocaleTimeString(),
      outcome,
      hesitationSeconds,
      voiceUsed,
      assistanceRequested: assistance
    };

    setAttempts(prev => [...prev, newAttempt]);
    setCompletedActivityIds(prev => [...prev, currentActivity.id]);

    // Update Cognitive Profile scores gently
    setCognitiveProfile(prev => {
      const currentDomainData = prev.domains[currentActivity.domain];
      const delta = outcome === 'recalled' ? 1.5 : outcome === 'assisted' ? 0.2 : -0.5;
      const updatedScore = Math.min(98, Math.max(50, Math.round(currentDomainData.score + delta)));
      return {
        ...prev,
        todayActivitiesCompleted: prev.todayActivitiesCompleted + 1,
        todaySessionMinutes: Math.max(prev.todaySessionMinutes, Math.floor(sessionSeconds / 60)),
        domains: {
          ...prev.domains,
          [currentActivity.domain]: {
            ...currentDomainData,
            score: updatedScore,
            totalSessions: currentDomainData.totalSessions + 1
          }
        }
      };
    });

    // Offline queue handling
    if (isOffline) {
      const queueItem: SyncQueueItem = {
        id: `sync-${Date.now()}`,
        action: 'RECORD_ATTEMPT',
        payloadSummary: `${currentActivity.type} (${outcome})`,
        timestamp: new Date().toLocaleTimeString(),
        status: 'queued_offline'
      };
      setSyncQueue(prev => [queueItem, ...prev]);
    }

    if (outcome === 'recalled') {
      audioService.playGentleChime('success');
    } else if (outcome === 'rested') {
      audioService.playGentleChime('rest');
    } else {
      audioService.playGentleChime('encouragement');
    }
  }, [currentActivity, sessionSeconds, isOffline]);

  // Memory Vault: Add Memory
  const addMemory = useCallback((newMemData: Omit<MemoryItem, 'id' | 'dateAdded' | 'approvedByCaregiver'>) => {
    const newId = `mem-${Date.now()}`;
    const newMemory: MemoryItem = {
      ...newMemData,
      id: newId,
      dateAdded: new Date().toISOString().split('T')[0],
      approvedByCaregiver: true
    };

    setMemories(prev => [newMemory, ...prev]);

    // Dynamically generate and prepend an AI Activity Card from this memory!
    const generatedActivity: FeedActivity = {
      id: `act-gen-${Date.now()}`,
      title: newMemory.title,
      domain: 'reminiscence',
      type: 'photo_memory',
      difficulty: 'gentle',
      promptText: `Aita, look at this newly added family memory from ${newMemory.year || 'years past'}. Do you recognize ${newMemory.person}?`,
      promptTextAssamese: `আইতা, এই সোণালী স্মৃতিখনলৈ চাওক। আপুনি ${newMemory.person}ক মনত পেলাইছে নে?`,
      promptTextHindi: `आइता, यह तस्वीर देखिए। क्या आप ${newMemory.person} को पहचानती हैं?`,
      audioInstruction: `Aita, who is in this warm family picture from ${newMemory.location}?`,
      culturalContext: `${newMemory.event} at ${newMemory.location}`,
      mediaUrl: newMemory.imageUri,
      memoryRefId: newId,
      options: [
        { id: 'opt-gen-1', text: newMemory.person, textAssamese: newMemory.person, textHindi: newMemory.person, isCorrect: true },
        { id: 'opt-gen-2', text: 'A Neighbor from Tezpur', textAssamese: 'তেজপুৰৰ ওচৰ-চুবুৰীয়া', textHindi: 'तेजपुर के पड़ोसी', isCorrect: false },
        { id: 'opt-gen-3', text: 'School Visitor', textAssamese: 'বিদ্যালয়ৰ অতিথি', textHindi: 'विद्यालय के अतिथि', isCorrect: false }
      ],
      correctOptionId: 'opt-gen-1',
      explainabilityReason: 'Newly vaulted family photograph automatically synthesized by AI Memory Structuring Engine into a personalized reminiscence activity.',
      dignifiedPraise: `Wonderful! You recognized ${newMemory.person} from your family album.`,
      dignifiedEncouragement: `This is ${newMemory.person} from ${newMemory.location}. It is so lovely to cherish this moment.`
    };

    setActivities(prev => [generatedActivity, ...prev]);

    if (isOffline) {
      setSyncQueue(prev => [{
        id: `sync-mem-${Date.now()}`,
        action: 'ADD_MEMORY',
        payloadSummary: `New Memory: ${newMemory.title}`,
        timestamp: new Date().toLocaleTimeString(),
        status: 'queued_offline'
      }, ...prev]);
    }

    audioService.playGentleChime('success');
  }, [isOffline]);

  const deleteMemory = useCallback((id: string) => {
    setMemories(prev => prev.filter(m => m.id !== id));
    setActivities(prev => prev.filter(a => a.memoryRefId !== id));
  }, []);

  const updateMemory = useCallback((id: string, updated: Partial<MemoryItem>) => {
    setMemories(prev => prev.map(m => (m.id === id ? { ...m, ...updated } : m)));
  }, []);

  // Intergenerational Bridge
  const addIntergenerationalMessage = useCallback((msg: Omit<IntergenerationalMessage, 'id' | 'dateSent' | 'status'>) => {
    const newMsg: IntergenerationalMessage = {
      ...msg,
      id: `intergen-${Date.now()}`,
      dateSent: 'Just now',
      status: 'new'
    };
    setIntergenerationalMessages(prev => [newMsg, ...prev]);
    audioService.playGentleChime('success');
  }, []);

  const answerIntergenerationalMessage = useCallback((id: string, response: string) => {
    setIntergenerationalMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'answered', patientVoiceResponse: response } : m));
    audioService.playGentleChime('success');
  }, []);

  // Caregiver Observations
  const addCaregiverObservation = useCallback((content: string, flagChange: boolean) => {
    const newObs: CaregiverObservation = {
      id: `obs-${Date.now()}`,
      timestamp: 'Just now',
      author: 'Sunita Baruah (Daughter)',
      content,
      flagChange,
      severity: flagChange ? 'notice' : 'info'
    };
    setCaregiverObservations(prev => [newObs, ...prev]);
  }, []);

  // Voice Recognition Simulation with Web Speech Recognition Fallback
  const startVoiceListening = useCallback((onTranscript: (text: string) => void) => {
    setIsVoiceListening(true);
    setSimulatedSpeechText('Listening to your voice...');

    // Attempt browser Web Speech Recognition if available
    const win = typeof window !== 'undefined' ? (window as unknown as Record<string, unknown>) : {};
    const SpeechRecognition = (win.SpeechRecognition || win.webkitSpeechRecognition) as (new () => {
      lang: string;
      interimResults: boolean;
      maxAlternatives: number;
      onresult: (e: { results: Array<Array<{ transcript: string }>> }) => void;
      onerror: () => void;
      start: () => void;
    }) | undefined;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'as' ? 'as-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: { results: Array<Array<{ transcript: string }>> }) => {
          const text = event.results[0][0].transcript;
          setSimulatedSpeechText(`“${text}”`);
          setIsVoiceListening(false);
          onTranscript(text);
        };

        recognition.onerror = () => {
          // Graceful fallback if permission denied or no input
          fallbackSimulation(onTranscript);
        };

        recognition.start();
        return;
      } catch {
        fallbackSimulation(onTranscript);
        return;
      }
    } else {
      fallbackSimulation(onTranscript);
    }

    function fallbackSimulation(cb: (txt: string) => void) {
      setTimeout(() => {
        let sample = 'Yes, Minati';
        if (currentActivity.options && currentActivity.options[0]) {
          sample = currentActivity.options[0].text;
        }
        setSimulatedSpeechText(`“${sample}”`);
        setIsVoiceListening(false);
        cb(sample);
      }, 2200);
    }
  }, [language, currentActivity]);

  const stopVoiceListening = useCallback(() => {
    setIsVoiceListening(false);
    setSimulatedSpeechText('');
  }, []);

  const completeSession = useCallback(() => {
    setIsSessionCompleted(true);
    setIsRestRecommended(false);
    audioService.playGentleChime('rest');
  }, []);

  const resetSession = useCallback(() => {
    setIsSessionCompleted(false);
    setSessionSeconds(0);
    setIsRestRecommended(false);
  }, []);

  const dismissRestPrompt = useCallback(() => {
    setIsRestRecommended(false);
  }, []);

  const value = useMemo(() => ({
    currentView,
    setCurrentView,
    language,
    setLanguage,
    patient,
    memories,
    addMemory,
    deleteMemory,
    updateMemory,
    intergenerationalMessages,
    addIntergenerationalMessage,
    answerIntergenerationalMessage,
    caregiverObservations,
    addCaregiverObservation,
    cognitiveProfile,
    currentActivity,
    feedIndex,
    attempts,
    recordAttempt,
    advanceToNextActivity,
    feedExplainability,
    currentDifficulty,
    isRestRecommended,
    dismissRestPrompt,
    sessionSeconds,
    sessionLimitMinutes,
    setSessionLimitMinutes,
    isSessionCompleted,
    completeSession,
    resetSession,
    isOffline,
    toggleOfflineMode,
    syncQueue,
    forceSyncQueue,
    isAudioMuted,
    toggleAudioMute,
    fontSizeScale,
    setFontSizeScale,
    reducedMotion,
    setReducedMotion,
    isVoiceListening,
    simulatedSpeechText,
    startVoiceListening,
    stopVoiceListening,
    speakPrompt
  }), [
    currentView,
    language,
    patient,
    memories,
    addMemory,
    deleteMemory,
    updateMemory,
    intergenerationalMessages,
    addIntergenerationalMessage,
    answerIntergenerationalMessage,
    caregiverObservations,
    addCaregiverObservation,
    cognitiveProfile,
    currentActivity,
    feedIndex,
    attempts,
    recordAttempt,
    advanceToNextActivity,
    feedExplainability,
    currentDifficulty,
    isRestRecommended,
    dismissRestPrompt,
    sessionSeconds,
    sessionLimitMinutes,
    isSessionCompleted,
    completeSession,
    resetSession,
    isOffline,
    toggleOfflineMode,
    syncQueue,
    forceSyncQueue,
    isAudioMuted,
    toggleAudioMute,
    fontSizeScale,
    reducedMotion,
    isVoiceListening,
    simulatedSpeechText,
    startVoiceListening,
    stopVoiceListening,
    speakPrompt
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
