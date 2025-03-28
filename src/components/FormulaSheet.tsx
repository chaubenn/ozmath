import React from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';

interface FormulaSheetProps {
  onClose: () => void;
}

export default function FormulaSheet({ onClose }: FormulaSheetProps) {
  // Convert Google Drive view URL to embed URL
  const fileId = '1IWm5q342DgZohKr4G0nuS6tRPiimyg5V';
  const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="fixed inset-4 flex items-center justify-center">
        <div className="relative w-full h-full max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-2xl">
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/10 backdrop-blur-sm text-gray-400 hover:text-gray-500 transition-colors"
            >
              <Cross2Icon className="w-6 h-6" />
            </button>
          </div>
          <div className="w-full h-full rounded-lg overflow-hidden">
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              title="Formula Sheet"
              allow="autoplay"
            />
          </div>
        </div>
      </div>
    </div>
  );
}