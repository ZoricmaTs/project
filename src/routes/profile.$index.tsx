import {createFileRoute, useNavigate} from '@tanstack/react-router';
import {useUserStore} from '../store/useUserStore.ts';
import {Button} from '../widgets/button';

export const Route = createFileRoute('/profile/$index')({
  component: RouteComponent,
})

function RouteComponent() {
  const userStore = useUserStore();
  const navigate = useNavigate();

  if (!userStore.user) {
    return <div className={'scene'}>
      <p>{'You are not authorized'}</p>
      <Button onClick={() => navigate({to: '/authorization'})} size={'sm'} variant={'primary'}>
        {'Go to authorization'}
      </Button>
    </div>;
  }

  return <div className={'scene'}>
    <p>{`Hello ${userStore.user?.name}!`}</p>

    <Button size={'sm'} variant={'outline'} onClick={() => navigate({to: '/upload'})}>
      {'Upload new video'}
    </Button>
    <Button
      onClick={() => userStore.logout().then(() => navigate({to: '/'}))}
      size={'sm'}
      variant={'primary'}
    >
      {'Logout'}
    </Button>
  </div>;
}
