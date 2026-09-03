export type UserRole = 'elderly' | 'caregiver' | 'clinician';

export type LanguageCode = 'en' | 'as' | 'hi' | 'bodo' | 'khasi' | 'mizo';

export type CognitiveDomain =
  | 'memory'
  | 'attention'
  | 'language'
  | 'orientation'
  | 'reasoning'
  | 'visual_spatial'
  | 'reminiscence';

export type ActivityDifficulty = 'gentle' | 'moderate' | 'engaging';

export type ActivityType =
  | 'photo_memory'
  | 'object_memory'
  | 'sequence'
  | 'attention'
  | 'language'
  | 'orientation'
  | 'story_recall'
  | 'cultural_memory'
  | 'voice_conversation'
  | 'intergenerational'
  | 'rest_break';

export interface MemoryItem {
  id: string;
  title: string;
  person: string;
  relationship: string;
  location: string;
  year: string;
  event: string;
  description: string;
  imageUri: string;
  audioPromptText?: string;
  approvedByCaregiver: boolean;
  tags: string[];
  dateAdded: string;
  aiSuggestedQuestions?: string[];
}

export interface ActivityOption {
  id: string;
  text: string;
  textAssamese?: string;
  textHindi?: string;
  imageUrl?: string;
  isCorrect?: boolean;
}

export interface FeedActivity {
  id: string;
  title: string;
  titleAssamese?: string;
  titleHindi?: string;
  domain: CognitiveDomain;
  type: ActivityType;
  difficulty: ActivityDifficulty;
  promptText: string;
  promptTextAssamese?: string;
  promptTextHindi?: string;
  audioInstruction: string;
  audioInstructionAssamese?: string;
  audioInstructionHindi?: string;
  culturalContext: string;
  options?: ActivityOption[];
  correctOptionId?: string;
  sequenceSteps?: { id: string; text: string; stepNumber: number }[];
  storySnippet?: string;
  mediaUrl?: string;
  memoryRefId?: string;
  intergenerationalSender?: {
    name: string;
    relation: string;
    avatarUrl: string;
    note: string;
  };
  explainabilityReason: string;
  dignifiedPraise: string;
  dignifiedEncouragement: string;
}

export interface ActivityAttempt {
  id: string;
  activityId: string;
  domain: CognitiveDomain;
  type: ActivityType;
  timestamp: string;
  outcome: 'recalled' | 'assisted' | 'skipped' | 'rested';
  hesitationSeconds: number;
  voiceUsed: boolean;
  assistanceRequested: boolean;
  notes?: string;
}

export interface CognitiveProfile {
  domains: Record<CognitiveDomain, { score: number; trend: 'stable' | 'improving' | 'soft_change'; totalSessions: number }>;
  weeklyMinutes: number[];
  longitudinalTrends: {
    week: string;
    memoryScore: number;
    attentionScore: number;
    languageScore: number;
    orientationScore: number;
    reasoningScore: number;
  }[];
  todaySessionMinutes: number;
  todayActivitiesCompleted: number;
  recommendedDurationMinutes: number;
  hesitationIndexAverage: number; // in seconds
}

export interface IntergenerationalMessage {
  id: string;
  senderName: string;
  senderRelation: string;
  avatarUrl: string;
  question: string;
  questionAssamese?: string;
  photoUrl?: string;
  dateSent: string;
  status: 'new' | 'answered' | 'archived';
  patientVoiceResponse?: string;
}

export interface CaregiverObservation {
  id: string;
  timestamp: string;
  author: string;
  content: string;
  flagChange: boolean;
  severity: 'info' | 'notice' | 'assessment_recommended';
}

export interface SyncQueueItem {
  id: string;
  action: string;
  payloadSummary: string;
  timestamp: string;
  status: 'synced' | 'queued_offline';
}

export interface DemoPatientProfile {
  id: string;
  name: string;
  preferredName: string;
  honorific: string; // "Aita" (Assamese for Grandmother)
  age: number;
  location: string;
  region: string;
  primaryLanguage: LanguageCode;
  secondaryLanguages: LanguageCode[];
  familyCaregiverName: string;
  familyCaregiverRelation: string;
  clinicianName: string;
  careCenter: string;
  baselineDate: string;
  lifeHistory: {
    childhoodPlace: string;
    profession: string;
    passions: string[];
    favoriteSongs: string[];
    favoriteTraditions: string[];
  };
}
