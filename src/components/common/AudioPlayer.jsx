
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause } from 'lucide-react';

export default function AudioPlayer({ audioUrl, title, isCompact = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false); // Define named function for consistency

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => console.log('Audio play failed:', err));
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const rect = e.target.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX) || 0; // Handle touch events for mobile
    const percent = (clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isCompact) {
    return (
      <div className="flex items-center gap-3">
        <audio ref={audioRef} src={audioUrl} preload="metadata" />
        
        <Button
          onClick={togglePlay}
          variant="outline"
          size="sm"
          className="w-8 h-8 rounded-full p-0 border-gray-300 text-gray-600 flex items-center justify-center"
          type="button"
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
        </Button>
        
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
          <button 
            className="flex-1 h-1 bg-gray-200 rounded-full cursor-pointer min-w-20"
            onClick={handleSeek}
            onTouchStart={handleSeek} // Add touch event for mobile
            type="button"
          >
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </button>
          <span className="text-xs text-gray-500">{formatTime(duration)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-lg p-4 border border-gray-200">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      <div className="flex items-center gap-4">
        <Button
          onClick={togglePlay}
          variant="outline"
          size="sm"
          className="border-gray-300 text-gray-600 hover:bg-gray-200"
          type="button"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        
        <div className="flex-1">
          <div className="text-sm text-gray-700 mb-2">{title}</div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
            <button 
              className="flex-1 h-2 bg-gray-200 rounded-full cursor-pointer"
              onClick={handleSeek}
              onTouchStart={handleSeek} // Add touch event for mobile
              type="button"
            >
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </button>
            <span className="text-xs text-gray-500">{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
