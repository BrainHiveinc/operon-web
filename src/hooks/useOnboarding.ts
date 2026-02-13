import { useState, useEffect } from 'react';

const ONBOARDING_KEY = 'operon-os-onboarding-complete';
const USER_INFO_KEY = 'operon-os-user-info';

export function useOnboarding() {
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean>(() => {
    // Check localStorage on initial load
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ONBOARDING_KEY) === 'true';
    }
    return false;
  });

  const [hasUserInfo, setHasUserInfo] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const userInfo = localStorage.getItem(USER_INFO_KEY);
      return userInfo !== null;
    }
    return false;
  });

  const completeOnboarding = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ONBOARDING_KEY, 'true');
      setIsOnboardingComplete(true);
    }
  };

  const saveUserInfo = (info: { name: string; email: string; phone: string }) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(info));
      setHasUserInfo(true);
      // Also complete onboarding when user provides info
      completeOnboarding();
    }
  };

  const getUserInfo = () => {
    if (typeof window !== 'undefined') {
      const info = localStorage.getItem(USER_INFO_KEY);
      return info ? JSON.parse(info) : null;
    }
    return null;
  };

  const resetOnboarding = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ONBOARDING_KEY);
      localStorage.removeItem(USER_INFO_KEY);
      setIsOnboardingComplete(false);
      setHasUserInfo(false);
    }
  };

  return {
    isOnboardingComplete,
    hasUserInfo,
    completeOnboarding,
    saveUserInfo,
    getUserInfo,
    resetOnboarding
  };
}
