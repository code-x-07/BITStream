'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  SkipBack,
  SkipForward,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VideoPlayerProps {
  videoUrl?: string;
  title?: string;
}

export default function VideoPlayer({
  videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4',
  title = 'Sample Video',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle fullscreen
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } else {
        if (document.fullscreenElement) {
          await document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${minutes}:${String(secs).padStart(2, '0')}`;
  };

  // Show controls on mouse move
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  // Update playback speed
  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  // Skip forward/backward
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, currentTime + seconds);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowRight':
          skip(5);
          break;
        case 'ArrowLeft':
          skip(-5);
          break;
        case 'KeyF':
          toggleFullscreen();
          break;
        case 'KeyM':
          setIsMuted(!isMuted);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, isFullscreen, isMuted, currentTime]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-black rounded-lg overflow-hidden glass-dark border border-white/10 group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !isPlaying && setShowControls(true)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-auto block"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onClick={togglePlay}
      />

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity ${
          showControls ? 'opacity-100' : ''
        }`}
      >
        {/* Progress Bar */}
        <div className="absolute bottom-16 left-0 right-0 px-4 group">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              if (videoRef.current) {
                videoRef.current.currentTime = parseFloat(e.target.value);
              }
            }}
            className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary"
            style={{
              background: `linear-gradient(to right, rgb(0, 217, 255) 0%, rgb(0, 217, 255) ${
                (currentTime / duration) * 100
              }%, rgb(255, 255, 255, 0.2) ${(currentTime / duration) * 100}%, rgb(255, 255, 255, 0.2) 100%)`,
            }}
          />
        </div>

        {/* Control Buttons */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between gap-3">
          {/* Left Controls */}
          <div className="flex items-center gap-2">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-primary" />
              ) : (
                <Play className="w-5 h-5 text-primary" />
              )}
            </button>

            {/* Skip Buttons */}
            <button
              onClick={() => skip(-10)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors hidden sm:block"
              title="Rewind 10s (←)"
            >
              <SkipBack className="w-4 h-4 text-primary" />
            </button>
            <button
              onClick={() => skip(10)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors hidden sm:block"
              title="Forward 10s (→)"
            >
              <SkipForward className="w-4 h-4 text-primary" />
            </button>

            {/* Volume Control */}
            <div className="relative flex items-center">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-primary" />
                ) : (
                  <Volume2 className="w-5 h-5 text-primary" />
                )}
              </button>
              {!isMuted && (
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => {
                    const newVolume = parseFloat(e.target.value);
                    setVolume(newVolume);
                    if (videoRef.current) {
                      videoRef.current.volume = newVolume;
                    }
                  }}
                  className="w-16 h-1 ml-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary hidden sm:block"
                />
              )}
            </div>

            {/* Time Display */}
            <div className="text-sm text-white/80 ml-2 font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Speed Control */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-1 text-sm text-primary hover:text-primary/80"
              >
                <Zap className="w-4 h-4" />
                {playbackSpeed}x
              </button>
              {showSpeedMenu && (
                <div className="absolute bottom-10 right-0 bg-black/90 border border-white/20 rounded-lg overflow-hidden z-20">
                  {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`block w-full px-4 py-2 text-sm text-left hover:bg-white/20 transition-colors ${
                        playbackSpeed === speed ? 'bg-primary/30 text-primary' : 'text-white/80'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Settings */}
            <button className="p-2 hover:bg-white/20 rounded-lg transition-colors hidden sm:block">
              <Settings className="w-5 h-5 text-primary" />
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              {isFullscreen ? (
                <Minimize className="w-5 h-5 text-primary" />
              ) : (
                <Maximize className="w-5 h-5 text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Video Title */}
      <div className="p-4 bg-card/50 backdrop-blur-sm">
        <h3 className="text-foreground font-semibold">{title}</h3>
      </div>
    </div>
  );
}
