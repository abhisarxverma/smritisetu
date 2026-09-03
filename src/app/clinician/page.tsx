'use client';

import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import ClinicianScreen from '../../components/clinician/ClinicianScreen';

export default function ClinicianPage() {
  const { setCurrentView } = useApp();

  useEffect(() => {
    setCurrentView('clinician');
  }, [setCurrentView]);

  return <ClinicianScreen />;
}
