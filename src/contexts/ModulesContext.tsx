'use client';

/**
 * Modules Context
 * Manages toggleable business modules (like Partners/Channel Portal)
 */

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface ModulesContextValue {
  partnersEnabled: boolean;
  setPartnersEnabled: (enabled: boolean) => void;
}

const ModulesContext = createContext<ModulesContextValue | undefined>(undefined);

export function ModulesProvider({ children }: { children: ReactNode }) {
  const [partnersEnabled, setPartnersEnabled] = useState(true); // Default: enabled
  const [mounted, setMounted] = useState(false);

  // Load from localStorage after mount
  useEffect(() => {
    const stored = localStorage.getItem('ps-edge:modules:partners-enabled');
    if (stored !== null) {
      setPartnersEnabled(stored === 'true');
    }
    setMounted(true);
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('ps-edge:modules:partners-enabled', String(partnersEnabled));
    }
  }, [partnersEnabled, mounted]);

  return (
    <ModulesContext.Provider value={{ partnersEnabled, setPartnersEnabled }}>
      {children}
    </ModulesContext.Provider>
  );
}

export function usePartnersEnabled() {
  const context = useContext(ModulesContext);
  if (!context) {
    throw new Error('usePartnersEnabled must be used within ModulesProvider');
  }
  return context.partnersEnabled;
}

export function useModules() {
  const context = useContext(ModulesContext);
  if (!context) {
    throw new Error('useModules must be used within ModulesProvider');
  }
  return context;
}
