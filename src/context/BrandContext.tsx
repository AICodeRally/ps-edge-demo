'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface BrandColors {
  gradientStart: string;
  gradientEnd: string;
}

interface BrandContextType {
  colors: BrandColors;
  setColors: (colors: BrandColors) => void;
  resetToDefault: () => void;
}

const defaultColors: BrandColors = {
  gradientStart: '#14b8a6', // teal-500
  gradientEnd: '#3b82f6',   // blue-500
};

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [colors, setColorsState] = useState<BrandColors>(defaultColors);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ps-edge-brand-colors');
      if (saved) {
        try {
          setColorsState(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse saved brand colors:', e);
        }
      }
    }
  }, []);

  // Apply colors as CSS variables
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.setProperty('--brand-gradient-start', colors.gradientStart);
      document.documentElement.style.setProperty('--brand-gradient-end', colors.gradientEnd);
    }
  }, [colors]);

  const setColors = (newColors: BrandColors) => {
    setColorsState(newColors);
    if (typeof window !== 'undefined') {
      localStorage.setItem('ps-edge-brand-colors', JSON.stringify(newColors));
    }
  };

  const resetToDefault = () => {
    setColors(defaultColors);
  };

  return (
    <BrandContext.Provider value={{ colors, setColors, resetToDefault }}>
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
}
