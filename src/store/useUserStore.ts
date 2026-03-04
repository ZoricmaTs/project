import {create} from 'zustand'
import {immer} from 'zustand/middleware/immer';
import {api} from '../api.ts';

export interface User {
  id: string,
  name: string,
  email: string,
  createdAt: Date,
}

export interface UserStore {
  user: User | null;
  authorize: (params: {
    email: string,
    password: string,
  }) => Promise<string>;
}

export const useUserStore = create<UserStore>()(
  immer((set) => ({
    user: null,
    authorize: async (params) => {
      const {user} = await api.login(params.email, params.password);

      set((state) => {
        state.user = user;
      });

      return user.id;
    },
  })),
);
