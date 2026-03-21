import {Volume2Icon, VolumeOffIcon} from 'lucide-react';
import React, {useCallback, useEffect} from 'react';
import {Slider} from '../slider';

export type VolumeType = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export function VolumeSlider({videoRef}: VolumeType) {
  const [value, setValue] = React.useState(0.5);
  const savedVolume = React.useRef<number>(0.5);

  const onVolumeUpdate = useCallback(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      setValue(videoElement.volume);
    }
  }, [videoRef]);


  useEffect(() => {
    const videoElement = videoRef.current;

    videoElement?.addEventListener('volumechange', onVolumeUpdate);

    return () => {
      videoElement?.removeEventListener('volumechange', onVolumeUpdate);
    }
  }, [onVolumeUpdate, videoRef]);

  const onChangeVolume = (val: number) => {
    setValue(val);

    if (videoRef.current) {
      videoRef.current.volume = val;
    }
  };

  const onMute = ()=>  {
    const newValue = value === 0 ? savedVolume.current : 0;

    if (!newValue) {
      savedVolume.current = value;
    }

    onChangeVolume(newValue)
  }

  return <div className={'volume'}>
    <button
      className={'volume__btn'}
      onClick={onMute}
    >
      {
        value === 0
          ? <VolumeOffIcon />
          : <Volume2Icon/>
      }
    </button>
    <Slider min={0} max={1} value={value} onChange={onChangeVolume} className={'volume__slider'}/>
  </div>;
}