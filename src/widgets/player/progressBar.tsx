import './style.scss';
import React, {type CSSProperties, useEffect, useRef, useState} from 'react';

export type ProgressBarProps = {
  progress: number;
  className?: string;
  onSeek(progress: number): void;
  currentTime: number;
} & CSSProperties;

export function ProgressBar({progress, className, onSeek, currentTime}: ProgressBarProps) {
  const totalRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  const [ seekPosition, setSeekPosition ] = useState<number>(0);

  useEffect(() => {
    if (totalRef.current) {
      setSeekPosition(Math.round(progress * totalRef.current.offsetWidth / 100));
    }
  }, [ progress ]);


  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setSeekPosition(e.nativeEvent.offsetX);
  }

  const onLeave = () => {
    setSeekPosition(0);
  }

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (totalRef.current && thumbRef.current) {
      const currentProgress = Math.round(e.nativeEvent.offsetX / totalRef.current?.offsetWidth * 100);
      setSeekPosition(e.nativeEvent.offsetX);
      onSeek(currentProgress);
    }
  }

  return <div className={`progress-bar ${className ? className : ''}`}>
    <div
      className={'progress-bar__tooltip'}
      style={{left: `calc(${progress}%)`}}
    >
      {currentTime}
    </div>
    <div  className={'progress-bar__wrapper'}>
      <div
        className={'progress-bar__total'}
        ref={totalRef}
        onMouseMove={onMove}
        onClick={onClick}
        onMouseLeave={onLeave}
      >
        <div
          className="progress-bar__progress"
          style={{width: progress + '%'}}
        />
        <div
          className={'progress-bar__handled-bar'}
          style={{width: seekPosition}}
        >
        </div>
        <div
          ref={thumbRef}
          className="progress-bar__thumb"
          style={{left: `calc(${progress}% - 6px)`}}
        />
      </div>
    </div>
  </div>
}