import { LanguageCode } from './types';

export interface UIStrings {
  appName: string;
  appTagline: string;
  elderlyRole: string;
  caregiverRole: string;
  clinicianRole: string;
  greetingAita: string;
  readyPrompt: string;
  iKnowButton: string;
  notSureButton: string;
  hearAgainButton: string;
  tellMeMoreButton: string;
  nextActivityButton: string;
  finishSessionButton: string;
  takeABreakTitle: string;
  takeABreakSubtitle: string;
  offlineIndicator: string;
  onlineIndicator: string;
  offlineBannerText: string;
  caregiverNotesTitle: string;
  memoryVaultTitle: string;
  addMemoryButton: string;
  explainabilityLabel: string;
  voiceListening: string;
  tapToSpeak: string;
  sessionMinutesLabel: string;
  activitiesCompletedLabel: string;
  todaySummary: string;
  disclaimer: string;
}

export const TRANSLATIONS: Record<LanguageCode, UIStrings> = {
  en: {
    appName: 'SmritiSetu',
    appTagline: 'Personalized Cognitive Care & Therapeutic Feed for North-East India',
    elderlyRole: 'Aita Mode (Elderly)',
    caregiverRole: 'Family & Caregiver',
    clinicianRole: 'Clinician Portal',
    greetingAita: 'Good morning, Aita ❤️',
    readyPrompt: 'Ready for today’s peaceful memory journey?',
    iKnowButton: 'I Remember',
    notSureButton: 'Give Me a Hint',
    hearAgainButton: 'Listen Again',
    tellMeMoreButton: 'Tell Me More',
    nextActivityButton: 'Next Gentle Activity',
    finishSessionButton: 'Complete Session & Rest',
    takeABreakTitle: 'You have done wonderfully today',
    takeABreakSubtitle: 'Resting the mind is just as important as remembering. Would you like to pause?',
    offlineIndicator: 'Offline Mode (Local Cached)',
    onlineIndicator: 'Connected to Cloud',
    offlineBannerText: 'Offline Mode Active — 11 core therapeutic activities and personal family photos are cached locally.',
    caregiverNotesTitle: 'Caregiver Sanctuary',
    memoryVaultTitle: 'Personal Memory Vault',
    addMemoryButton: 'Add Family Memory',
    explainabilityLabel: 'AI Engine Rationale',
    voiceListening: 'Listening to your voice...',
    tapToSpeak: 'Tap to speak your answer',
    sessionMinutesLabel: 'Minutes Engaged',
    activitiesCompletedLabel: 'Activities Completed',
    todaySummary: 'Daily Cognitive Wellness Overview',
    disclaimer: 'SmritiSetu is designed for supportive cognitive stimulation and caregiver awareness. It is not a diagnostic tool and does not replace medical consultation.'
  },
  as: {
    appName: 'স্মৃতিসেতু',
    appTagline: 'উত্তৰ-পূৰ্বাঞ্চলৰ বয়োজেষ্ঠসকলৰ বাবে স্মৃতি সংৰক্ষণ আৰু চিন্তা উদ্দীপক মাধ্যম',
    elderlyRole: 'আইতাৰ মৰমৰ কোঠা',
    caregiverRole: 'পৰিয়াল আৰু সেৱক',
    clinicianRole: 'চিকিৎসক পৰিদৰ্শন',
    greetingAita: 'নমস্কাৰ, আইতা ❤️',
    readyPrompt: 'আজিৰ সোণালী স্মৃতিৰ যাত্ৰালৈ সাজু নে?',
    iKnowButton: 'মই মনত পেলাইছোঁ',
    notSureButton: 'অলপ সহায় কৰি দিয়ক',
    hearAgainButton: 'আকৌ এবাৰ শুনক',
    tellMeMoreButton: 'আৰু অলপ কওক',
    nextActivityButton: 'পৰৱৰ্তী কামলৈ যাওক',
    finishSessionButton: 'আজিৰ জিৰণি লওঁ',
    takeABreakTitle: 'আজি আপুনি বৰ সুন্দৰকৈ মনত পেলালে',
    takeABreakSubtitle: 'মনটো শান্ত কৰাটোও মনত পেলোৱাৰ সমানেই জৰুৰী। অলপ জিৰণি ল’ব নেকি?',
    offlineIndicator: 'অফলাইন মোড (সংৰক্ষিত)',
    onlineIndicator: 'ইণ্টাৰনেট সংযুক্ত',
    offlineBannerText: 'অফলাইন ব্যৱস্থা সক্ৰিয় — স্থানীয়ভাৱে ১১টা গুৰুত্বপূৰ্ণ খেল আৰু পৰিয়ালৰ ছবি সংৰক্ষিত আছে।',
    caregiverNotesTitle: 'পৰিয়ালৰ সেৱা ডেশ্ববৰ্ড',
    memoryVaultTitle: 'পৰিয়ালৰ স্মৃতি ভঁৰাল',
    addMemoryButton: 'নতুন স্মৃতি যোগ কৰক',
    explainabilityLabel: 'কৃটিম বুদ্ধিমত্তাৰ কাৰণ',
    voiceListening: 'আপোনাৰ মাত শুনি থকা হৈছে...',
    tapToSpeak: 'কথা ক’বলৈ ইয়াত চুই দিয়ক',
    sessionMinutesLabel: 'ব্যয় কৰা সময় (মিনিট)',
    activitiesCompletedLabel: 'সম্পূৰ্ণ কৰা কাৰ্য্য',
    todaySummary: 'দৈনন্দিন স্মৃতি আৰু মানসিক স্থিতিৰ বিৱৰণ',
    disclaimer: 'স্মৃতিসেতু বয়োজেষ্ঠসকলৰ মানসিক উদ্দীপনা আৰু পৰিয়ালৰ সাহাৰ্য্যৰ বাবেহে। ই কোনো চিকিৎসা নিদান বা ৰোগ নিৰ্ণয়কাৰী ব্যৱস্থা নহয়।'
  },
  hi: {
    appName: 'स्मृतिसेतु',
    appTagline: 'पूर्वोत्तर भारत के वरिष्ठ नागरिकों हेतु संज्ञानात्मक स्वास्थ्य व स्मृति मंच',
    elderlyRole: 'आइता कक्ष (वरिष्ठ नागरिक)',
    caregiverRole: 'परिवार व देखभालकर्ता',
    clinicianRole: 'चिकित्सक पोर्टल',
    greetingAita: 'सादर प्रणाम, आइता ❤️',
    readyPrompt: 'क्या आप आज की मधुर स्मृतियों के सफर के लिए तैयार हैं?',
    iKnowButton: 'मुझे याद आया',
    notSureButton: 'थोड़ा संकेत दीजिए',
    hearAgainButton: 'फिर से सुनिए',
    tellMeMoreButton: 'और बताइए',
    nextActivityButton: 'अगली सरल गतिविधि',
    finishSessionButton: 'सत्र समाप्त कर विश्राम करें',
    takeABreakTitle: 'आज आपने बहुत सुंदर प्रयास किया',
    takeABreakSubtitle: 'मन को शांत रखना भी उतना ही महत्वपूर्ण है। क्या आप विश्राम करना चाहेंगी?',
    offlineIndicator: 'ऑफलाइन मोड (सुरक्षित डेटा)',
    onlineIndicator: 'इंटरनेट से जुड़ा हुआ',
    offlineBannerText: 'ऑफलाइन मोड सक्रिय — स्थानीय रूप से 11 प्रमुख गतिविधियां और परिवार के चित्र उपलब्ध हैं।',
    caregiverNotesTitle: 'देखभालकर्ता डैशबोर्ड',
    memoryVaultTitle: 'पारिवारिक स्मृति संदूक',
    addMemoryButton: 'नई स्मृति जोड़ें',
    explainabilityLabel: 'एआई चयन का कारण',
    voiceListening: 'आपकी बात सुनी जा रही है...',
    tapToSpeak: 'बोलने के लिए यहाँ स्पर्श करें',
    sessionMinutesLabel: 'सत्र का समय (मिनट)',
    activitiesCompletedLabel: 'पूर्ण गतिविधियाँ',
    todaySummary: 'दैनिक मानसिक स्वास्थ्य का सारांश',
    disclaimer: 'स्मृतिसेतु वरिष्ठ नागरिकों की मानसिक सक्रियता और परिवार की सहायता हेतु है। यह कोई चिकित्सीय निदान नहीं है।'
  },
  bodo: {
    appName: 'SmritiSetu (बड़ो - Prototype)',
    appTagline: 'सानफ्रोमबोनि गोसोखां आरो मेलेम गोहो दाफुंथायारी हाबाफारि',
    elderlyRole: 'Aita Room (Bodo)',
    caregiverRole: 'Nokhor & Caregiver',
    clinicianRole: 'Doctor Portal',
    greetingAita: 'Khulumby, Aita ❤️',
    readyPrompt: 'Dinwini gosokhang thungrimw?',
    iKnowButton: 'Ang Gosokhangnw Haangba',
    notSureButton: 'Eseng Hephazab Ho',
    hearAgainButton: 'Fenai Khwusang',
    tellMeMoreButton: 'Gubonbu Bung',
    nextActivityButton: 'Thangdo Gudan Habafari',
    finishSessionButton: 'Dinwini Habani Biran',
    takeABreakTitle: 'Dinwi nang bwrwi mोजाং khalamdwng',
    takeABreakSubtitle: 'Gosoni biran lani som jwng.',
    offlineIndicator: 'Offline Mode (Local Bodo)',
    onlineIndicator: 'Online',
    offlineBannerText: 'Offline Mode Active for Rural Bodoland regions.',
    caregiverNotesTitle: 'Caregiver Dashboard',
    memoryVaultTitle: 'Memory Vault',
    addMemoryButton: 'Add Memory',
    explainabilityLabel: 'AI Rationale',
    voiceListening: 'Khwusangdwnw...',
    tapToSpeak: 'Bungnw Thainw',
    sessionMinutesLabel: 'Minutes',
    activitiesCompletedLabel: 'Completed',
    todaySummary: 'Daily Summary',
    disclaimer: 'This is a supportive prototype for North Eastern communities.'
  },
  khasi: {
    appName: 'SmritiSetu (Khasi - Prototype)',
    appTagline: 'Ka jingiarap kynmaw bad pynsmat jingmut na ka bynta ki tymmen',
    elderlyRole: 'Mei-ieid Room (Khasi)',
    caregiverRole: 'Khadduh & Caregiver',
    clinicianRole: 'Doctor Portal',
    greetingAita: 'Khublei, Mei-ieid ❤️',
    readyPrompt: 'Phi la kloi ban sdang ban kynmaw?',
    iKnowButton: 'Nga Kynmaw',
    notSureButton: 'Ai Jingiarap Khyndiat',
    hearAgainButton: 'Sngap Biang',
    tellMeMoreButton: 'Iathuh Shuh Shuh',
    nextActivityButton: 'Jingpynkynmaw Kaba Bud',
    finishSessionButton: 'Shongthait Mynta',
    takeABreakTitle: 'Phi la trei bha mynta ka sngi',
    takeABreakSubtitle: 'Ban shongthait ka long kaba donkam. Phi kwah ban shongthait?',
    offlineIndicator: 'Offline Mode (Khasi Hills)',
    onlineIndicator: 'Online',
    offlineBannerText: 'Offline Mode Active for remote Meghalaya hill regions.',
    caregiverNotesTitle: 'Caregiver Sanctuary',
    memoryVaultTitle: 'Memory Vault',
    addMemoryButton: 'Add Memory',
    explainabilityLabel: 'AI Rationale',
    voiceListening: 'Dang sngap...',
    tapToSpeak: 'Kren Hangne',
    sessionMinutesLabel: 'Miniti',
    activitiesCompletedLabel: 'La Dep',
    todaySummary: 'Ka jingpynkynmaw mynta ka sngi',
    disclaimer: 'Designed to support cognitive engagement and caregiver awareness in Khasi communities.'
  },
  mizo: {
    appName: 'SmritiSetu (Mizo - Prototype)',
    appTagline: 'Pitar leh putar te tana hriatna tihchakna leh enkawlna',
    elderlyRole: 'Pi Pi Room (Mizo)',
    caregiverRole: 'Chhungkua & Enkawltu',
    clinicianRole: 'Doctor Enkawlna',
    greetingAita: 'Chibai, Pi Pi ❤️',
    readyPrompt: 'Vawiin hriatrengna zinkawng zawh i inpeih em?',
    iKnowButton: 'Ka hria e',
    notSureButton: 'Min pui hram teh',
    hearAgainButton: 'Ngaithla nawn leh rawh',
    tellMeMoreButton: 'Min hrilh belh rawh',
    nextActivityButton: 'A dawt leh',
    finishSessionButton: 'Chawl tawh ang',
    takeABreakTitle: 'Vawiin chu i ti tha hle mai',
    takeABreakSubtitle: 'Chawlh hahdam pawh hi a pawimawh em em a ni. I chawl rih duh em?',
    offlineIndicator: 'Offline Mode (Mizoram Hills)',
    onlineIndicator: 'Online',
    offlineBannerText: 'Offline Mode Active for remote hill terrain.',
    caregiverNotesTitle: 'Enkawltu Pual',
    memoryVaultTitle: 'Hriatrengna Bawm',
    addMemoryButton: 'Hriatrengna Dah Belh',
    explainabilityLabel: 'AI Chhan',
    voiceListening: 'Ngaihthlak mek a ni...',
    tapToSpeak: 'Tawng turin hmet rawh',
    sessionMinutesLabel: 'Minit',
    activitiesCompletedLabel: 'Tih zawh zat',
    todaySummary: 'Vawiin dinhmun tlangpui',
    disclaimer: 'He platform hi hriatna tihchak nan leh enkawltu te tanpui nana duan a ni.'
  }
};
