'use client';

import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import CaregiverScreen from '../../components/caregiver/CaregiverScreen';

export default function CaregiverPage() {
  const { setCurrentView } = useApp();

  useEffect(() => {
    setCurrentView('caregiver');
  }, [setCurrentView]);

  return <CaregiverScreen />;
}
