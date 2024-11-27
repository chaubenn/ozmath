import React, { createContext, useContext, useState } from 'react';

type ForegroundSymbols = 'math' | 'greek' | 'numbers';

const symbols: Record<ForegroundSymbols, string[]> = {
  math: ['∫', '∑', '∏', '√', 'π', '∞', '∂', '∇', '∆', '≈', '≠', '≤', '≥', '±', '×'],
  greek: ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'κ', 'λ', 'μ', 'ρ', 'σ', 'τ', 'φ'],
  numbers: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '×', '÷', '=']
};

interface ForegroundContextType {
  theme: ForegroundSymbols;
  symbols: string[];
  setTheme: (theme: ForegroundSymbols) => void;
}

const ForegroundContext = createContext<ForegroundContextType | undefined>(undefined);

export function ForegroundProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ForegroundSymbols>('math');

  return (
    <ForegroundContext.Provider value={{ theme, symbols: symbols[theme], setTheme }}>
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