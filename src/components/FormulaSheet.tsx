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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={onClose}
              className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <Cross2Icon className="w-6 h-6" />
            </button>
          </div>
          <div className="h-[80vh] overflow-y-auto p-6">
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