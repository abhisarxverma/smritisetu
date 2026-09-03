'use client';

import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import ResearchScreen from '../../components/research/ResearchScreen';

export default function ResearchPage() {
  const { setCurrentView } = useApp();

  useEffect(() => {
    setCurrentView('research');
  }, [setCurrentView]);

  return <ResearchScreen />;
}
