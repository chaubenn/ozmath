import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSubscriptionStore } from '../stores/subscriptionStore';

type ForegroundSymbols = 'solid' | 'math' | 'greek' | 'numbers';

const symbols: Record<ForegroundSymbols, string[]> = {
  solid: [],
  math: ['∫', '∑', '∏', '√', 'π', '∞', '∂', '∇', '∆', '≈', '≠', '≤', '≥', '±', '×'],
  greek: ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'κ', 'λ', 'μ', 'ρ', 'σ', 'τ', 'φ'],
  numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '×', '÷', '=']
};

interface ForegroundContextType {
  theme: ForegroundSymbols;
  symbols: string[];
  setTheme: (theme: ForegroundSymbols) => void;
  availableThemes: Array<{
    id: ForegroundSymbols;
    name: string;
    requiresPremium: boolean;
  }>;
}

const ForegroundContext = createContext<ForegroundContextType | undefined>(undefined);

export function ForegroundProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ForegroundSymbols>('solid');
  const { isPremium } = useSubscriptionStore();

  const availableThemes = [
    { id: 'solid', name: 'Minimal (Performance)', requiresPremium: false },
    { id: 'math', name: 'Mathematical', requiresPremium: true },
    { id: 'greek', name: 'Greek Letters', requiresPremium: true },
    { id: 'numbers', name: 'Numbers', requiresPremium: true }
  ] as const;

  useEffect(() => {
    if (!isPremium && theme !== 'solid') {
      setThemeState('solid');
    }
  }, [isPremium, theme]);

  const setTheme = (newTheme: ForegroundSymbols) => {
    if (newTheme !== 'solid' && !isPremium) {
      console.warn('Premium theme selected without premium subscription');
      return;
    }
    setThemeState(newTheme);
  };

  return (
    <ForegroundContext.Provider 
      value={{ 
        theme, 
        symbols: symbols[theme], 
        setTheme,
        availableThemes
      }}
    >
      {children}
    </ForegroundContext.Provider>
  );
}

export function useForeground() {
  const context = useContext(ForegroundContext);
  if (context === undefined) {
    throw new Error('useForeground must be used within a ForegroundProvider');
  }
  return context;
}
