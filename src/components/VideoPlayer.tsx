import React from 'react';
import MuxPlayer from '@mux/mux-player-react';

interface VideoPlayerProps {
  src: string;
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  // Extract playback ID from the Mux URL, removing any file extensions
  const playbackId = src.split('/').pop()?.split('.')[0] || '';

  return (
    <MuxPlayer
      streamType="on-demand"
      playbackId={playbackId}
      metadata={{
        video_title: 'Problem Solution',
        player_name: 'OzMath Player'
      }}
      className="w-full rounded-lg aspect-video"
      autoPlay={false}
      muted={false}
    />
  );
}