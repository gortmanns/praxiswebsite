'use client';

import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '@/firebase/provider'; // Import useAuth from the same provider file

export interface UserHookResult {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

/**
 * Hook specifically for accessing the authenticated user's state.
 * This provides the User object, loading status, and any auth errors.
 * It depends on the Auth service being available from `useAuth`.
 * @returns {UserHookResult} Object with user, isUserLoading, userError.
 */
export const useUser = (): UserHookResult => {
  const auth = useAuth(); // Get the auth instance from the context

  const [userState, setUserState] = useState<UserHookResult>({
    user: auth.currentUser, // Initialize with the current user if available
    isUserLoading: true,    // Start loading until the first auth state event
    userError: null,
  });

  useEffect(() => {
    // If the auth instance isn't ready, we can't do anything.
    if (!auth) {
      setUserState({ user: null, isUserLoading: false, userError: new Error("Auth service not available.") });
      return;
    }

    // Set loading state to true when the auth object changes.
    setUserState({ user: auth.currentUser, isUserLoading: true, userError: null });

    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        // Auth state has been determined (user is either logged in or null)
        setUserState({ user: firebaseUser, isUserLoading: false, userError: null });
      },
      (error) => {
        // An error occurred in the auth state listener
        console.error("useUser: onAuthStateChanged error:", error);
        setUserState({ user: null, isUserLoading: false, userError: error });
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]); // This effect re-runs if the auth instance itself changes

  return userState;
};
