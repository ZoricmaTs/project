import React, {useEffect, useRef, useState} from 'react';
import './style.scss';

export type SliderType = {
  value: number;
  onChange: (value: number) => void;
  max: number;
  min: number;
  step?: number;
}

export function Slider(props: SliderType) {
  const totalRef = useRef<HTMLDivElement>(null);
  const percent = (props.value - props.min) / (props.max - props.min) * 100;
  const [ seekPosition, setSeekPosition ] = useState<number>(0);
  const dragStartPosition = useRef<number>(0);
  const windowMoveHandlerRef = useRef<(e: MouseEvent) => void | null>(null);
  const windowUpHandlerRef = useRef<(e: MouseEvent) => void | null>(null);

  function fromPercent(percent: number) {
    return props.min + (props.max - props.min) * percent / 100;
  }

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!totalRef.current) {
      return;
    }

    const rect = totalRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newValue = Math.round((offsetX / rect.width) * 100);

    setSeekPosition(newValue);
  }

  const onLeave = () => {
    if (!totalRef.current) {
      return;
    }

    setSeekPosition(0);
  }

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!totalRef.current) {
      return;
    }

    const rect = totalRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newValue = Math.round((offsetX / rect.width) * 100);

    props.onChange(fromPercent(newValue));

  }

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!totalRef.current) {
      return;
    }

    const rect = totalRef.current.getBoundingClientRect();
    const min = rect.left;
    const max = rect.right;


    dragStartPosition.current = e.screenX;

    windowMoveHandlerRef.current = (e) => {
      if (!totalRef.current) {
        return;
      }

      const normalizedX = Math.min(Math.max(e.screenX, min), max);
      const relativePosition = normalizedX - min;
      const newValue = Math.round((relativePosition / rect.width) * 100);

      props.onChange(fromPercent(newValue));
    };

    windowUpHandlerRef.current = () => {
      if (windowMoveHandlerRef.current) {
        window.removeEventListener('mousemove', windowMoveHandlerRef.current);
        window.removeEventListener('mouseup', windowUpHandlerRef.current!);
      }
    }

    window.addEventListener('mousemove', windowMoveHandlerRef.current);
    window.addEventListener('mouseup', windowUpHandlerRef.current);
  }

  useEffect(() => {
    return () => {
      if (windowMoveHandlerRef.current) {
        window.removeEventListener('mousemove', windowMoveHandlerRef.current);
      }

      if (windowUpHandlerRef.current) {
        window.removeEventListener('mouseup', windowUpHandlerRef.current);
      }
    }
  }, []);


  return <div className={'slider'}
    onMouseMove={onMove}
    onClick={onClick}
    onMouseLeave={onLeave}
    onMouseDown={onMouseDown}>
    <div className={'slider__wrapper'}>
      <div
        ref={totalRef}
        className={'slider__total'}
      />
      <div className={'slider__hover-slider'} style={{width: `${seekPosition}%`}}/>
      <div className={'slider__progress'} style={{width: `${percent}%`}}>
        <div className={'slider__thumb'}/>
      </div>
    </div>
  </div>
}