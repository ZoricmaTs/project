import {ProgressBar} from './progressBar.tsx';
import {PauseIcon, PlayIcon} from 'lucide-react';
import React, {useCallback, useEffect, useState} from 'react';
import './style.scss';
import {VolumeSlider} from './volumeSlider.tsx';

export type ControlsType = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export function Controls({videoRef}: ControlsType) {
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    const hadler = () => {
      if (videoElement) {
        setDuration(videoElement.duration);
      }
    }

    videoElement?.addEventListener('loadedmetadata', hadler);

    return () => {
      videoElement?.removeEventListener('loadedmetadata', hadler);
    }
  }, [videoRef]);
  
  const onTimeUpdate = useCallback(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      setProgress(videoElement.currentTime);
    }
  }, [videoRef]);

  const onVolumeUpdate = useCallback(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      setVolume(videoElement.volume);
    }
  }, [videoRef]);


  const onPlay = () => {
    if (!videoRef.current) {
      return;
    }

    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setPlaying(!playing);
  }

  useEffect(() => {
    const videoElement = videoRef.current;
    
    videoElement?.addEventListener('timeupdate', onTimeUpdate);
    videoElement?.addEventListener('volumechange', onVolumeUpdate);

    return () => {
      videoElement?.removeEventListener('timeupdate', onTimeUpdate);
      videoElement?.removeEventListener('volumechange', onVolumeUpdate);
    }
  }, [onTimeUpdate, onVolumeUpdate, videoRef]);

  const onVolumeChange = (volume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  return <div className={'player__controls'}>
    {!!duration &&
      <ProgressBar
        className={'player__progress'}
        progress={progress}
        onSeek={handleSeek}
        duration={duration}
      />}
    <div className={'player__controls_buttons-wrapper'}>
      <div className={'player__controls_buttons-left'}>
        <button onClick={onPlay}>
          {playing
            ? <PauseIcon />
            : <PlayIcon />
          }
        </button>
        <VolumeSlider volume={volume} onVolumeChange={onVolumeChange}/>
      </div>
      <div className={'player__controls_buttons-right'}>
        {/*<button onClick={openSettings}>*/}
        {/*  <SettingsIcon />*/}
        {/*</button>*/}
      </div>
    </div>
  </div>
}