'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { WifiOff, RefreshCw, CheckCircle2, HardDrive } from 'lucide-react';

export default function OfflineBanner() {
  const { isOffline, toggleOfflineMode, syncQueue, forceSyncQueue } = useApp();

  if (!isOffline && syncQueue.length === 0) return null;

  return (
    <aside aria-label="System Connectivity and Sync Status" className={`border-b transition-all ${
      isOffline
        ? 'bg-amber-950/80 border-amber-800 text-amber-100'
        : 'bg-emerald-950/80 border-emerald-800 text-emerald-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2.5">
            {isOffline ? (
              <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500 flex items-center justify-center shrink-0">
                <WifiOff className="w-3.5 h-3.5 text-amber-300" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              </div>
            )}
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold tracking-wide">
                  {isOffline ? 'OFFLINE FIRST ENGINE ACTIVE' : 'CLOUD SYNCHRONIZATION COMPLETE'}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-900/60 text-amber-200 border border-amber-700/50">
                  NER Low-Bandwidth Architecture
                </span>
              </div>
              <p className="text-[11px] text-amber-200/80">
                {isOffline
                  ? 'Core cognitive feed, audio prompts, and memory vault remain 100% accessible offline via local device caching.'
                  : 'All session telemetry and caregiver notes securely synchronized.'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 self-end sm:self-center">
            {syncQueue.length > 0 && (
              <div className="flex items-center space-x-1.5 text-[11px] font-mono bg-stone-900/60 px-2 py-1 rounded border border-amber-800/40">
                <HardDrive className="w-3 h-3 text-amber-400" />
                <span>
                  {syncQueue.filter(q => q.status === 'queued_offline').length} queued changes
                </span>
              </div>
            )}

            {isOffline ? (
              <button
                onClick={toggleOfflineMode}
                className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-stone-900 font-semibold transition-colors flex items-center space-x-1 shadow-sm"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Simulate Online Reconnection</span>
              </button>
            ) : (
              syncQueue.some(q => q.status === 'queued_offline') && (
                <button
                  onClick={forceSyncQueue}
                  className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors flex items-center space-x-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Sync Queued Data Now</span>
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
