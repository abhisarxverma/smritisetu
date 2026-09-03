'use client';

import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import TherapeuticFeed from '../../components/elderly/TherapeuticFeed';

export default function ElderlyPage() {
  const { setCurrentView } = useApp();

  useEffect(() => {
    setCurrentView('elderly');
  }, [setCurrentView]);

  return <TherapeuticFeed />;
}
