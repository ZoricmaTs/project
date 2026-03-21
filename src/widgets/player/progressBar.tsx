import './style.scss';
import {type CSSProperties} from 'react';
import {Slider} from '../slider';

export type ProgressBarProps = {
  progress?: number;
  className?: string;
  onSeek(progress: number): void;
  duration: number;
} & CSSProperties;

export function ProgressBar({progress, className, onSeek, duration}: ProgressBarProps) {
  const onChangeTime = (time: number) => {
    onSeek(time);
  }

  return <div className={`progress-bar ${className ? className : ''}`}>
    {/*<div*/}
    {/*  className={'progress-bar__tooltip'}*/}
    {/*  // style={{left: hoverPos}}*/}
    {/*>*/}
    {/*  {getDuration(duration)}*/}
    {/*</div>*/}
    <Slider min={0} max={duration} value={progress ? progress : 0} onChange={onChangeTime}/>
  </div>
}