import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {Input} from '../widgets/input';
import {Button} from '../widgets/button';
import {useUserStore} from '../store/useUserStore.ts';
import {AxiosError} from 'axios';
import React, {useState} from 'react';

export const Route = createFileRoute('/registration')({
  component: RouteComponent,
})

function RouteComponent() {
  const userStore = useUserStore();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    repeatPassword: "",
  });

  const onRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = (e.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
    const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;

    if (password !== (e.currentTarget.elements.namedItem('passwordRepeat') as HTMLInputElement).value) {
      setErrors({
        email: "",
        password: "",
        name: "",
        repeatPassword: "Passwords do not match",
      });

      return;
    }

    userStore.register({name, email, password}).then(() => {
      navigate({to: '/authorization'}).catch(null);
    }).catch((error: AxiosError<{message: string, errors: Record<string, string>}>) => {
      setErrors({
        email: error.response?.data?.errors?.email || "",
        password: error.response?.data?.errors?.password || "",
        name: error.response?.data?.errors?.name || "",
        repeatPassword: "",
      })
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
        errors={errors['name'] ? [errors['name']] : []}
      />
      <Input
        id={'email'}
        type={'email'}
        label={'Email'}
        placeholder={'Email'}
        required
        errors={errors['email'] ? [errors['email']] : []}
      />
      <Input
        id={'password'}
        type={'password'}
        label={'Password'}
        placeholder={'Password'}
        required
        errors={errors['password'] ? [errors['password']] : []}
      />
      <Input
        id={'passwordRepeat'}
        type={'password'}
        label={'Repeat password'}
        placeholder={'Repeat password'}
        required
        errors={errors['repeatPassword'] ? [errors['repeatPassword']] : []}
      />

      <div style={{display: 'flex', gap: '1rem', paddingTop: '1rem'}}>
        <Button type={'submit'}>{'Register'}</Button>
        <Button variant={'outline'} onClick={() => navigate({to: '/authorization'})}>{'Go to authorization'}</Button>
      </div>
    </form>
  </div>
}
