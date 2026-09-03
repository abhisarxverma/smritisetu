import { DemoPatientProfile, MemoryItem, IntergenerationalMessage, CaregiverObservation, CognitiveProfile } from './types';

export const DEMO_PATIENT: DemoPatientProfile = {
  id: 'patient-anima-devi-01',
  name: 'Anima Devi Baruah',
  preferredName: 'Anima',
  honorific: 'Aita', // "Grandmother" in Assamese
  age: 72,
  location: 'Tezpur, Sonitpur District',
  region: 'Assam, North Eastern Region, India',
  primaryLanguage: 'as', // Assamese
  secondaryLanguages: ['en', 'hi'],
  familyCaregiverName: 'Sunita Baruah (Daughter)',
  familyCaregiverRelation: 'Daughter & Primary Caregiver',
  clinicianName: 'Dr. Bhupen Sarma, MD (Geriatric Care)',
  careCenter: 'GMCH Geriatric Memory Outpost & Tezpur Sub-divisional Health Center',
  baselineDate: '2026-03-15',
  lifeHistory: {
    childhoodPlace: 'Bishwanath Ghat on the banks of Brahmaputra',
    profession: 'Retired Primary School Headmistress (Tezpur Govt. Vidyalaya)',
    passions: ['Traditional Assam loom weaving (Taat Xal)', 'Borgeet devotional hymns', 'Kitchen gardening', 'Folk storytelling'],
    favoriteSongs: ['Bistirno Parore (Dr. Bhupen Hazarika)', 'Srimanta Sankardev Borgeet'],
    favoriteTraditions: ['Rongali Bihu pitha preparation', 'Gamosa weaving for Bohag', 'Evening lamp at Tulsi plant']
  }
};

export const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-01',
    title: 'Sister Minati at Umananda Island',
    person: 'Minati (Younger Sister)',
    relationship: 'Sister',
    location: 'Umananda Island Ferry, Brahmaputra River, Guwahati',
    year: '1987',
    event: 'Autumn Sister Trip',
    description: 'Anima with her beloved younger sister Minati riding the wooden ferry across the Brahmaputra to the hilltop temple in Guwahati.',
    imageUri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    audioPromptText: 'Aita, look closely at this photograph from 1987. Do you remember who was sitting next to you on the ferry to Umananda?',
    approvedByCaregiver: true,
    tags: ['Sister', 'Family Trip', 'Brahmaputra', 'Guwahati'],
    dateAdded: '2026-08-20',
    aiSuggestedQuestions: [
      'Who is sitting beside you in this photo?',
      'Do you remember the boat ride across the Brahmaputra?',
      'What did you and Minati eat at the temple bazaar?'
    ]
  },
  {
    id: 'mem-02',
    title: 'Ananya’s Fifth Birthday Celebration',
    person: 'Ananya (Granddaughter)',
    relationship: 'Granddaughter',
    location: 'Ancestral Courtyard, Tezpur',
    year: '2014',
    event: 'Birthday Gathering & Pitha Making',
    description: 'Granddaughter Ananya holding her handmade clay toy while Aita fed her sweet Narikol Laru.',
    imageUri: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    audioPromptText: 'Aita, this little girl is celebrating her 5th birthday in Tezpur. Which granddaughter is this?',
    approvedByCaregiver: true,
    tags: ['Grandchild', 'Birthday', 'Tezpur', 'Laru'],
    dateAdded: '2026-08-22',
    aiSuggestedQuestions: [
      'Which grandchild is holding the toy here?',
      'What sweet treat did you make for her birthday?'
    ]
  },
  {
    id: 'mem-03',
    title: 'Retirement Felicitation with Phulam Gamosa',
    person: 'Colleagues & Students',
    relationship: 'School Community',
    location: 'Tezpur Primary Vidyalaya',
    year: '2016',
    event: '34 Years Teaching Service Retirement',
    description: 'Anima receiving the prestigious red-and-white handwoven Phulam Gamosa and Xorai after 34 years educating generations of village children.',
    imageUri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    audioPromptText: 'Here you are receiving respect from the school community. What handwoven gift did your students place around your shoulders?',
    approvedByCaregiver: true,
    tags: ['School', 'Teaching', 'Gamosa', 'Honor'],
    dateAdded: '2026-08-25',
    aiSuggestedQuestions: [
      'Do you remember the school where you taught for 34 years?',
      'What is the name of the white and red handwoven scarf you are holding?'
    ]
  },
  {
    id: 'mem-04',
    title: 'Bihu Dance under the Kopou Orchid Tree',
    person: 'Youth Friends in Chah Bagan (Tea Estate)',
    relationship: 'Childhood Friends',
    location: 'Monabarie Tea Estate, Biswanath',
    year: '1975',
    event: 'Rongali Bihu Spring Festival',
    description: 'Aita in her young days wearing the golden Muga Mekhela Sador with fresh purple Kopou Phool in her hair, enjoying the Dhol beats.',
    imageUri: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80',
    audioPromptText: 'Look at the festive springtime dance under the tree. Which special purple flower is tucked into the hair during Rongali Bihu?',
    approvedByCaregiver: true,
    tags: ['Bihu', 'Kopou Phool', 'Muga Silk', 'Youth'],
    dateAdded: '2026-08-28',
    aiSuggestedQuestions: [
      'Which festival was being celebrated in this photo?',
      'Can you name the wild purple orchid worn in the hair?'
    ]
  }
];

export const INITIAL_INTERGENERATIONAL_MESSAGES: IntergenerationalMessage[] = [
  {
    id: 'intergen-01',
    senderName: 'Ananya Baruah',
    senderRelation: 'Granddaughter (17 yrs)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    question: 'Aita, Ma said you used to sing a beautiful Goalparia song when it rained in Tezpur. Will you tell me what the words mean?',
    questionAssamese: 'আইতা, মায়ে কৈছিল যে তেজপুৰত বৰষুণ দিলে আপুনি এটা ধুনীয়া গোৱালপৰীয়া গান গাইছিল। সেই গানটো মোক শুনাব নেকি?',
    photoUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80',
    dateSent: 'Today at 9:30 AM',
    status: 'new',
    patientVoiceResponse: 'Ananya mor mor, the song talks about the gentle monsoon breeze on the Brahmaputra ghat...'
  },
  {
    id: 'intergen-02',
    senderName: 'Priyam Baruah',
    senderRelation: 'Grandson (12 yrs)',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
    question: 'Aita! Did you really see wild deer right next to your school compound when you were young?',
    questionAssamese: 'আইতা! আপুনি সঁচাকৈয়ে সৰুতে আপোনাৰ স্কুলৰ কাষতে হৰিণ দেখিছিল নেকি?',
    dateSent: 'Yesterday at 4:15 PM',
    status: 'answered',
    patientVoiceResponse: 'Yes bupai, the Kaziranga forests were so close that swamp deer often came by the misty morning streams!'
  }
];

export const INITIAL_CAREGIVER_OBSERVATIONS: CaregiverObservation[] = [
  {
    id: 'obs-01',
    timestamp: 'Today, 10:15 AM',
    author: 'Sunita Baruah (Daughter)',
    content: 'Aita was in very high spirits after recognizing her sister Minati’s photo. She smiled and hummed a Bihu tune for 15 minutes afterward.',
    flagChange: false,
    severity: 'info'
  },
  {
    id: 'obs-02',
    timestamp: 'Yesterday, 6:40 PM',
    author: 'Sunita Baruah (Daughter)',
    content: 'Noticeable hesitation on orientation questions about the day of the week, though she correctly recognized the morning tea sequence without assistance.',
    flagChange: true,
    severity: 'notice'
  },
  {
    id: 'obs-03',
    timestamp: '28 Aug 2026, 11:30 AM',
    author: 'Dr. Bhupen Sarma (Geriatric Specialist)',
    content: 'Longitudinal profile over past 6 weeks shows strong emotional and visual-spatial stability with familiar NER cultural anchors. Periodic orientation pauses are consistent with mild supportive stage; continue bounded reminiscence sessions without pressure.',
    flagChange: false,
    severity: 'info'
  }
];

export const INITIAL_COGNITIVE_PROFILE: CognitiveProfile = {
  domains: {
    memory: { score: 86, trend: 'improving', totalSessions: 42 },
    attention: { score: 78, trend: 'stable', totalSessions: 38 },
    language: { score: 88, trend: 'stable', totalSessions: 44 },
    orientation: { score: 68, trend: 'soft_change', totalSessions: 36 },
    reasoning: { score: 79, trend: 'stable', totalSessions: 30 },
    visual_spatial: { score: 84, trend: 'improving', totalSessions: 35 },
    reminiscence: { score: 92, trend: 'improving', totalSessions: 46 }
  },
  weeklyMinutes: [14, 16, 12, 18, 15, 12, 14], // last 7 days (bounded 10-18 mins)
  longitudinalTrends: [
    { week: 'Week 1', memoryScore: 81, attentionScore: 74, languageScore: 85, orientationScore: 72, reasoningScore: 75 },
    { week: 'Week 2', memoryScore: 83, attentionScore: 76, languageScore: 86, orientationScore: 70, reasoningScore: 77 },
    { week: 'Week 3', memoryScore: 84, attentionScore: 75, languageScore: 87, orientationScore: 71, reasoningScore: 78 },
    { week: 'Week 4', memoryScore: 82, attentionScore: 77, languageScore: 86, orientationScore: 69, reasoningScore: 76 },
    { week: 'Week 5', memoryScore: 85, attentionScore: 78, languageScore: 88, orientationScore: 68, reasoningScore: 79 },
    { week: 'Week 6 (Current)', memoryScore: 86, attentionScore: 78, languageScore: 88, orientationScore: 68, reasoningScore: 79 }
  ],
  todaySessionMinutes: 12,
  todayActivitiesCompleted: 7,
  recommendedDurationMinutes: 15,
  hesitationIndexAverage: 3.4 // seconds
};
