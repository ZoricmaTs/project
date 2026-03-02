import {createFileRoute, useNavigate} from '@tanstack/react-router';
import {Input} from '../widgets/input';
import {Button} from '../widgets/button';
import {useUserStore} from '../store/useUserStore.ts';

export const Route = createFileRoute('/authorization')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const userStore = useUserStore();

  const onAuthSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

    userStore.authorize({email, password}).then(() => {
      navigate({to: '/'}).catch(null);
    }).catch(() => {
      alert('Login failed!');
    });
  }

  return <div className={'scene'}>
    <h1>Authorization</h1>
    <form onSubmit={onAuthSubmit}>
      <Input
        id={'email'}
        type={'email'}
        label={'Email'}
        placeholder={'Email'}
        required
        onChange={() => {}}
      />
      <Input
        id={'password'}
        type={'password'}
        label={'Password'}
        placeholder={'Password'}
        required
        onChange={() => {}}
      />
      <Button type={'submit'}>{'Login'}</Button>
    </form>
  </div>
}
