import { createFileRoute } from '@tanstack/react-router'
import {useUserStore} from '../store/useUserStore.ts';

export const Route = createFileRoute('/profile/$index')({
  component: RouteComponent,
})

function RouteComponent() {
  const userStore = useUserStore();
  return <div>Hello {userStore.user?.name}!</div>
}
