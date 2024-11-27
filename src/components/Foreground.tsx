import React from 'react';
import { useForeground } from '../context/ForegroundContext';

export default function Foreground() {
  const { symbols } = useForeground();

  return (
    <div className="fixed inset-0 grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-2 p-4 opacity-5 dark:opacity-10 pointer-events-none select-none">
      {Array.from({ length: 192 }).map((_, i) => (
        <div
          key={i}
          className="text-3xl md:text-4xl font-serif text-black dark:text-white animate-float"
          style={{
            animationDelay: `${Math.random() * 10}s`,
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: Math.random() * 0.5 + 0.5
          }}
        >
          {symbols[Math.floor(Math.random() * symbols.length)]}
        </div>
      ))}
    </div>
  );
}