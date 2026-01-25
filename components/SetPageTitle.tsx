'use client';

import { useEffect } from 'react';
import { usePageTitle } from '@/context/PageTitleContext';

interface SetPageTitleProps {
  title: string;
  description?: string;
}

/**
 * Helper component to set the page title in the navbar.
 * Place at the top of any page component to update the client name display.
 *
 * @example
 * <SetPageTitle title="Team Members" description="Manage consultant capacity" />
 */
export function SetPageTitle({ title, description }: SetPageTitleProps) {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle(title, description);
  }, [title, description, setPageTitle]);

  return null;
}
