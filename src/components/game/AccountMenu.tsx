'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useGame } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Cloud, CloudOff, User, LogIn, LogOut, Link2, Loader2 } from 'lucide-react';

export function AccountMenu() {
  const { user, isLoading, isAnonymous, signInWithGoogle, linkGoogleAccount, signOut, error, clearError } = useAuth();
  const { isSyncing, cloudCities, refreshCloudCities } = useGame();
  const [isLinking, setIsLinking] = useState(false);

  const handleSignIn = async () => {
    clearError();
    await signInWithGoogle();
  };

  const handleLinkAccount = async () => {
    clearError();
    setIsLinking(true);
    try {
      await linkGoogleAccount();
    } finally {
      setIsLinking(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const handleRefresh = async () => {
    await refreshCloudCities();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded border border-white/10">
        <Loader2 className="w-4 h-4 animate-spin text-white/60" />
        <span className="text-xs text-white/60">Loading...</span>
      </div>
    );
  }

  // Not signed in
  if (!user) {
    return (
      <Button
        onClick={handleSignIn}
        variant="outline"
        size="sm"
        className="gap-2 bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-white/80"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Sign In</span>
      </Button>
    );
  }

  // Signed in as anonymous
  if (isAnonymous) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded border border-white/10">
          <CloudOff className="w-4 h-4 text-amber-400/80" />
          <span className="text-xs text-white/60 hidden sm:inline">Guest</span>
        </div>
        <Button
          onClick={handleLinkAccount}
          variant="outline"
          size="sm"
          disabled={isLinking}
          className="gap-2 bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20 text-white/80"
        >
          {isLinking ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Link2 className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">Link Account</span>
        </Button>
        {error && (
          <span className="text-xs text-red-400 max-w-[150px] truncate">{error}</span>
        )}
      </div>
    );
  }

  // Signed in with Google
  return (
    <div className="flex items-center gap-2">
      {/* Sync status */}
      <button
        onClick={handleRefresh}
        disabled={isSyncing}
        className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-colors"
        title={`${cloudCities.length} cloud saves`}
      >
        {isSyncing ? (
          <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
        ) : (
          <Cloud className="w-4 h-4 text-green-400" />
        )}
        <span className="text-xs text-white/60">{cloudCities.length}</span>
      </button>

      {/* User info */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded border border-white/10">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Avatar"
            className="w-5 h-5 rounded-full"
          />
        ) : (
          <User className="w-4 h-4 text-white/60" />
        )}
        <span className="text-xs text-white/80 max-w-[100px] truncate hidden sm:inline">
          {user.displayName || user.email || 'User'}
        </span>
      </div>

      {/* Sign out */}
      <Button
        onClick={handleSignOut}
        variant="ghost"
        size="sm"
        className="px-2 text-white/60 hover:text-white/80 hover:bg-white/10"
        title="Sign out"
      >
        <LogOut className="w-4 h-4" />
      </Button>

      {error && (
        <span className="text-xs text-red-400 max-w-[150px] truncate">{error}</span>
      )}
    </div>
  );
}

