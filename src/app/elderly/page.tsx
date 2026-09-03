'use client';

import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import PacedReminiscenceStream from '../../components/elderly/PacedReminiscenceStream';

export default function ElderlyPage() {
  const { setCurrentView } = useApp();

  useEffect(() => {
    setCurrentView('elderly');
  }, [setCurrentView]);

  return <PacedReminiscenceStream />;
}
