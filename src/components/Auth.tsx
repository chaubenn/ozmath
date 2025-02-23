import React from 'react';
import AuthModal from './AuthModal';

interface AuthProps {
  onClose: () => void;
}

export default function Auth({ onClose }: AuthProps) {
  return <AuthModal onClose={onClose} />;
}