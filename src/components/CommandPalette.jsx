import React, { createContext, useCallback, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

// Sun lives at /cli. ⌘K (or Ctrl+K) jumps there from anywhere.
const AskSunContext = createContext(null);

export function AskSunProvider({ children }) {
  const router = useRouter();
  const open = useCallback(() => router.push('/cli'), [router]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        router.push('/cli');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [router]);

  return <AskSunContext.Provider value={{ open }}>{children}</AskSunContext.Provider>;
}

export function useAskSun() {
  return useContext(AskSunContext) || { open: () => {} };
}

// Kept so _app's render call is a no-op now that the UI lives at /cli.
export default function CommandPalette() {
  return null;
}
