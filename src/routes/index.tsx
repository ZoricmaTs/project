import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {Button} from '../widgets/button';
import {useUserStore} from '../store/useUserStore.ts';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const navigate = useNavigate();
  const userStore = useUserStore();
  console.log('userStore', )
  return (
    <div className={'scene'}>
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