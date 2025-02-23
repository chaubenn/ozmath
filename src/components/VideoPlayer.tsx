import React, { useState, useEffect } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { AlertCircle } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  // Extract playback ID from the Mux URL
  const getPlaybackId = (url: string): string => {
    try {
      if (url.includes('/')) {
        return url.split('/').pop()?.split('.')[0] || '';
      }
      return url;
    } catch (err) {
      console.error('Error parsing Mux URL:', err);
      return '';
    }
  };

  const playbackId = getPlaybackId(src);

  // Reset error state when src changes
  useEffect(() => {
    setError(null);
    setRetryCount(0);
  }, [src]);

  const handleError = (e: any) => {
    console.error('Mux Player error:', e);
    
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setError(`Playback failed. Retrying... (${retryCount + 1}/${maxRetries})`);
      
      // Add a small delay before retry
      setTimeout(() => {
        const player = document.querySelector('mux-player');
        if (player) {
          player.dispatchEvent(new Event('loadstart'));
        }
      }, 1000);
    } else {
      setError('Unable to play video. Please try refreshing the page or using a different browser.');
    }
    setIsLoading(false);
  };

  if (!playbackId) {
    return (
      <div className="w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center p-4">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-gray-600 dark:text-gray-400">Video URL is invalid</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <MuxPlayer
        streamType="on-demand"
        playbackId={playbackId}
        metadata={{
          video_title: 'Problem Solution',
          player_name: 'OzMath Player',
          video_id: playbackId,
          browser: navigator.userAgent // Add browser info for debugging
        }}
        onLoadStart={() => setIsLoading(true)}
        onLoadedData={() => {
          setIsLoading(false);
          setError(null);
        }}
        onError={handleError}
        className="w-full h-full rounded-lg"
        autoPlay={false}
        muted={false}
        accentColor="#4F46E5"
        preload="auto" // Add preload
        crossOrigin="anonymous" // Add CORS attribute
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
          <div className="text-center p-4">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-white">{error}</p>
            {retryCount >= maxRetries && (
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
              >
                Refresh Page
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
