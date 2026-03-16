import { createFileRoute } from '@tanstack/react-router'
import {Button} from '../widgets/button';
import {api} from '../api.ts';
import React from 'react';

export const Route = createFileRoute('/upload')({
  component: RouteComponent,
})

type UploadStatus = 'QUEUED' | 'PROCESSING' | 'READY';

function RouteComponent() {
  const [uploadStatus, setUploadStatus] = React.useState<UploadStatus | null>(null);
  const onUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem("fileInput") as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return alert("Choose a file");
    }

    const { videoId, uploadUrl } = (await api.createUploadUrl(file.name, file.name)).data;

    setUploadStatus('QUEUED');

    await fetch(uploadUrl, {
      method: "PUT",
      body: file
    }).then(() => {
      setUploadStatus('PROCESSING');
    });

    await api.markUploaded(videoId).then(() => {
      setUploadStatus('READY');
    });

    alert("Video uploaded and queued for processing")
  }

  return <div className={'scene'}>
    <h1>{'Upload video'}</h1>
    {uploadStatus === 'READY'
      ? (
        <div>
          <p>{'Your video is ready!'}</p>
          <Button
            size={'sm'}
            variant={'primary'}
            onClick={() => setUploadStatus(null)}
          >
            {'Upload another video'}
          </Button>
        </div>
      )
      : (
        <form onSubmit={onUpload}>
          <input type="file" id="fileInput" name="fileInput"/>
          <Button
            size={'sm'}
            variant={'primary'}
            type={'submit'}
          >
            {'video upload'}
          </Button>
          {uploadStatus && <p>{`Upload status: ${uploadStatus}`}</p>}
        </form>
      )
    }
  </div>;
}
