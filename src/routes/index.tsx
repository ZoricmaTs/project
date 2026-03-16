import {createFileRoute, useNavigate} from '@tanstack/react-router';
import {Button} from '../widgets/button';
import {useUserStore} from '../store/useUserStore.ts';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const userStore = useUserStore();

  return (
    <div className={'scene'}>
      <Button
        size={'sm'}
        variant={'outline'}
        onClick={async () => {
          const videoId = 'bc5adb4d-9961-4c11-b629-a00faae0871b';

          navigate({to: '/player/$videoId', params: {videoId}}).catch(null);
        }}
      >
        {'player'}
      </Button>

      <Button
        size={'sm'}
        variant={'primary'}
        onClick={() => navigate({to: '/authorization'})}
      >
        {'authorization'}
      </Button>
      <h3>Welcome Home!</h3>
      {userStore.user && <p>привет!!!! {userStore.user?.name}</p>}
    </div>
  )
}