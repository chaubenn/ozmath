import React from 'react';
import Foreground from './Foreground';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      <Foreground />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}