import {Volume2Icon} from 'lucide-react';
import React from 'react';
import {Slider} from '../slider';

export type VolumeType = {
  volume: number;
  onVolumeChange: (number: number) => void;
}

export function VolumeSlider({volume, onVolumeChange}: VolumeType) {
  const [value, setValue] = React.useState(volume);

  const onChangeVolume = (val: number) => {
    setValue(val);
    onVolumeChange(val);
  };

  return <div className={'volume'}>
    <button
      className={'volume__btn'}
    >
      <Volume2Icon/>
    </button>
    <Slider min={0} max={1} value={value} onChange={onChangeVolume}/>
  </div>;
}