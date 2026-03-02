import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {Button} from '../widgets/button';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const navigate = useNavigate();
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
    </div>
  )
}