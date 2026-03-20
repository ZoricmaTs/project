import './style.scss';
import {useEffect, useRef, useState} from 'react';
import {ProgressBar} from './progressBar.tsx';
import {PlayIcon, PauseIcon} from 'lucide-react';

type PlayerProps = {
  video: {
    id: string;
    title: string;
    processedVideos: { url: string }[];
  };
};

export function Player({video}: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currPosition, setCurrPosition] = useState(0);
  const source = video.processedVideos?.[0]?.url;

  useEffect(() => {
    if (videoRef.current) {
      setCurrPosition(videoRef.current.currentTime);
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) {
      return;
    }

    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(null);
    }

    setPlaying(!playing);
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;

      const progressPercentage = (currentTime / duration) * 100;
      setProgress(progressPercentage);
    }
  }

  const handleSeek = (progress: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = videoRef.current.duration * progress / 100;
    }
  };

  if (!source) {
    return;
  }

  return <div className={'player'}>
    {video && <video
      ref={videoRef}
      className={'player__video'}
      onTimeUpdate={handleTimeUpdate}
    >
      <source src={'/public/3.mp4'} type="video/mp4"/>
      {/*<source src={video.processedVideos[0].url} type="video/mp4"/>*/}
    </video>
    }

    <div className={'player__controls'}>
      <ProgressBar
        className={'player__progress'}
        progress={progress}
        onSeek={handleSeek}
        currentTime={currPosition}
      />
      <div>
        <button onClick={togglePlay}>
          {playing
            ? <PauseIcon />
            : <PlayIcon />
          }
        </button>
      </div>
    </div>
  </div>;
}