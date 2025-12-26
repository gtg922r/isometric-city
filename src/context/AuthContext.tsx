// Authentication Context for Firebase
'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously as firebaseSignInAnonymously,
  linkWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase';

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAnonymous: boolean;
  error: string | null;
};

type AuthContextValue = AuthState & {
  signInWithGoogle: () => Promise<void>;
  signInAnonymously: () => Promise<void>;
  linkGoogleAccount: () => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen to auth state changes
  useEffect(() => {
    const auth = getFirebaseAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const auth = getFirebaseAuth();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in with Google';
      setError(message);
      console.error('Google sign-in error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signInAnonymously = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const auth = getFirebaseAuth();
      await firebaseSignInAnonymously(auth);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign in anonymously';
      setError(message);
      console.error('Anonymous sign-in error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const linkGoogleAccount = useCallback(async (): Promise<boolean> => {
    if (!user || !user.isAnonymous) {
      setError('Must be signed in anonymously to link account');
      return false;
    }

    setError(null);
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await linkWithPopup(user, provider);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to link Google account';
      setError(message);
      console.error('Link account error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const signOut = useCallback(async () => {
    setError(null);
    try {
      const auth = getFirebaseAuth();
      await firebaseSignOut(auth);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to sign out';
      setError(message);
      console.error('Sign out error:', err);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextValue = {
    user,
    isLoading,
    isAnonymous: user?.isAnonymous ?? false,
    error,
    signInWithGoogle,
    signInAnonymously,
    linkGoogleAccount,
    signOut,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

// Safe version that returns null when outside AuthProvider
// Used by GameContext which may be loaded before AuthProvider
export function useAuthSafe(): AuthContextValue | null {
  return useContext(AuthContext);
}

