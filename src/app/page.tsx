'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import LandingPage from '../components/landing/LandingPage';
import TherapeuticFeed from '../components/elderly/TherapeuticFeed';
import CaregiverScreen from '../components/caregiver/CaregiverScreen';
import ClinicianScreen from '../components/clinician/ClinicianScreen';
import ResearchScreen from '../components/research/ResearchScreen';

export default function Home() {
  const { currentView } = useApp();

  switch (currentView) {
    case 'elderly':
      return <TherapeuticFeed />;
    case 'caregiver':
      return <CaregiverScreen />;
    case 'clinician':
      return <ClinicianScreen />;
    case 'research':
      return <ResearchScreen />;
    case 'landing':
    default:
      return <LandingPage />;
  }
}
