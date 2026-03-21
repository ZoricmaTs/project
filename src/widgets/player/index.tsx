import './style.scss';
import {useRef, useState} from 'react';
import {Controls} from './controls.tsx';

type ProcessedVideo = {
  url: string;
  duration: number;
};

export type VideoType = {
  id: string;
  title: string;
  duration: number;
  processedVideos: ProcessedVideo[];
  validationStatus: string;
}
export type PlayerProps = {
  video: VideoType;
};

export function Player({video}: PlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [curSource, setSource] = useState<ProcessedVideo>(video.processedVideos?.[0]);

  const source = video.processedVideos?.[0]?.url;

  if (!source) {
    return;
  }

  return <div className={'player'}>
    {video && <video
      ref={videoRef}
      className={'player__video'}
    >
      <source src={curSource.url} type="video/mp4"/>
    </video>
    }

    <Controls videoRef={videoRef}/>
  </div>;
}