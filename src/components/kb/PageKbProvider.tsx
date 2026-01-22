'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface PageKbContent {
  title: string;
  description: string;
  content: string;
  owner?: string;
  lastUpdated?: string;
  tags?: string[];
  error?: string;
}

interface PageKbContextType {
  kbContent: PageKbContent | null;
  isLoading: boolean;
  error: string | null;
  refreshKb: () => void;
}

const PageKbContext = createContext<PageKbContextType | undefined>(undefined);

export function PageKbProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [kbContent, setKbContent] = useState<PageKbContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchKbContent = async () => {
    // Abort previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/ui-kb/page?path=${encodeURIComponent(pathname)}`, {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        if (response.status === 404) {
          setKbContent({
            title: 'No KB Content',
            description: 'No knowledge base content available for this page.',
            content: '# Coming Soon\n\nDocumentation for this page is being prepared.',
          });
        } else {
          throw new Error('Failed to load KB content');
        }
      } else {
        const data = await response.json();
        setKbContent(data);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('KB fetch error:', err);
        setError(err.message || 'Failed to load KB content');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKbContent();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [pathname]);

  return (
    <PageKbContext.Provider
      value={{
        kbContent,
        isLoading,
        error,
        refreshKb: fetchKbContent,
      }}
    >
      {children}
    </PageKbContext.Provider>
  );
}

export function usePageKb() {
  const context = useContext(PageKbContext);
  if (context === undefined) {
    throw new Error('usePageKb must be used within a PageKbProvider');
  }
  return context;
}
