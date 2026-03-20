import {createFileRoute} from '@tanstack/react-router';
import {api} from '../api.ts';
import React, {useEffect} from 'react';
import {Player} from '../widgets/player';

export const Route = createFileRoute('/player/$videoId')({
  component: RouteComponent,
});

function RouteComponent() {
  const {videoId} = Route.useParams();
  const [video, setVideo] = React.useState<{ id: string, title: string, processedVideos: {url: string}[], validationStatus: string } | null>(null);

  useEffect(() => {

    api.getVideo(videoId).then(value => {
      setVideo(value.data);
    });
  }, [videoId]);

  console.log('video', video);
  // const video720 = video.processedVideos.find(v => v.width === 1280)

  return <div className={'scene'}>
    <h1>{'Player'}</h1>
    {!video && <p>{'Loading...'}</p>}
    {!!video &&
      <Player video={video}/>
    }
  </div>
}
