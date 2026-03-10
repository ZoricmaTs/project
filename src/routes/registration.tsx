import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {Input} from '../widgets/input';
import {Button} from '../widgets/button';
import {useUserStore} from '../store/useUserStore.ts';

export const Route = createFileRoute('/registration')({
  component: RouteComponent,
})

function RouteComponent() {
  const userStore = useUserStore();
  const navigate = useNavigate();

  const onRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

    userStore.register({name, email, password}).then(() => {
      navigate({to: '/authorization'});
    }).catch((error) => {
      console.log(error);
    });
  }

  return <div className={'scene'}>
    <h1>Registration</h1>
    <form onSubmit={onRegisterSubmit}>
      <Input
        id={'name'}
        type={'text'}
        label={'Name'}
        placeholder={'Name'}
        required
      />
      <Input
        id={'email'}
        type={'email'}
        label={'Email'}
        placeholder={'Email'}
        required
      />
      <Input
        id={'password'}
        type={'password'}
        label={'Password'}
        placeholder={'Password'}
        required
      />
      <Input
        id={'passwordRepeat'}
        type={'password'}
        label={'Repeat password'}
        placeholder={'Repeat password'}
        required
      />
      <div style={{display: 'flex', gap: '1rem', paddingTop: '1rem'}}>
        <Button type={'submit'}>{'Register'}</Button>
        <Button variant={'outline'} onClick={() => navigate({to: '/authorization'})}>{'Go to authorization'}</Button>
      </div>
    </form>
  </div>
}
