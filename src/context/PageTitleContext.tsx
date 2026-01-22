'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface PageTitleContextType {
  title: string;
  description: string;
  setPageTitle: (title: string, description?: string) => void;
}

const PageTitleContext = createContext<PageTitleContextType | undefined>(undefined);

export function PageTitleProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState('NP-Edge');
  const [description, setDescription] = useState('Nonprofit Operations Platform');

  const setPageTitle = useCallback((newTitle: string, newDescription?: string) => {
    setTitle(newTitle);
    if (newDescription !== undefined) {
      setDescription(newDescription);
    }
  }, []);

  return (
    <PageTitleContext.Provider value={{ title, description, setPageTitle }}>
      {children}
    </PageTitleContext.Provider>
  );
}

export function usePageTitle() {
  const context = useContext(PageTitleContext);
  if (context === undefined) {
    throw new Error('usePageTitle must be used within a PageTitleProvider');
  }
  return context;
}
