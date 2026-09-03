'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import LandingPage from '../components/landing/LandingPage';
import PacedReminiscenceStream from '../components/elderly/PacedReminiscenceStream';
import CaregiverScreen from '../components/caregiver/CaregiverScreen';
import ClinicianScreen from '../components/clinician/ClinicianScreen';
import ResearchScreen from '../components/research/ResearchScreen';

export default function Home() {
  const { currentView } = useApp();

  switch (currentView) {
    case 'elderly':
      return <PacedReminiscenceStream />;
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
