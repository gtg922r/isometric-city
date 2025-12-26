'use client';

import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Cloud, HardDrive, GitMerge, Loader2 } from 'lucide-react';

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function CityList({ cities, icon, title }: { cities: { cityName: string; population: number; savedAt: number }[]; icon: React.ReactNode; title: string }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="text-sm font-medium text-white/80">{title}</h3>
        <span className="text-xs text-white/50">({cities.length})</span>
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
        {cities.map((city, index) => (
          <div
            key={`${city.cityName}-${index}`}
            className="p-2 bg-white/5 rounded border border-white/10"
          >
            <div className="font-medium text-sm text-white/90 truncate">
              {city.cityName}
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50 mt-1">
              <span>Pop: {city.population.toLocaleString()}</span>
              <span>•</span>
              <span>{formatDate(city.savedAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SyncConflictDialog() {
  const { syncConflict, resolveSyncConflict, isSyncing } = useGame();
  const [isResolving, setIsResolving] = useState(false);

  if (!syncConflict) return null;

  const handleResolve = async (resolution: 'local' | 'cloud' | 'merge') => {
    setIsResolving(true);
    try {
      await resolveSyncConflict(resolution);
    } finally {
      setIsResolving(false);
    }
  };

  const isLoading = isSyncing || isResolving;

  return (
    <Dialog open={!!syncConflict} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-2xl bg-slate-900 border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Sync Your Cities</DialogTitle>
          <DialogDescription className="text-white/60">
            You have saved cities on this device and in the cloud. Choose how to handle them.
          </DialogDescription>
        </DialogHeader>

        {/* City comparison */}
        <div className="flex gap-6 mt-4">
          <CityList
            cities={syncConflict.localCities}
            icon={<HardDrive className="w-4 h-4 text-amber-400" />}
            title="This Device"
          />
          <CityList
            cities={syncConflict.cloudCities}
            icon={<Cloud className="w-4 h-4 text-blue-400" />}
            title="Cloud"
          />
        </div>

        {/* Resolution options */}
        <div className="grid gap-3 mt-6">
          <Button
            onClick={() => handleResolve('merge')}
            disabled={isLoading}
            className="w-full py-6 bg-green-600 hover:bg-green-700 text-white"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <GitMerge className="w-4 h-4 mr-2" />
            )}
            Merge Both
            <span className="ml-2 text-xs opacity-70">(Recommended)</span>
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleResolve('local')}
              disabled={isLoading}
              variant="outline"
              className="py-4 bg-white/5 hover:bg-white/10 border-white/10 text-white/80"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <HardDrive className="w-4 h-4 mr-2" />
              )}
              Keep Local
            </Button>

            <Button
              onClick={() => handleResolve('cloud')}
              disabled={isLoading}
              variant="outline"
              className="py-4 bg-white/5 hover:bg-white/10 border-white/10 text-white/80"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Cloud className="w-4 h-4 mr-2" />
              )}
              Use Cloud
            </Button>
          </div>
        </div>

        <p className="text-xs text-white/40 mt-4 text-center">
          Merging will combine cities from both sources. Duplicates with the same ID will use the most recent version.
        </p>
      </DialogContent>
    </Dialog>
  );
}

