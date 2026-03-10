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
  }) => Promise<User>;
  register: (params: {
    name: string,
    email: string,
    password: string,
  }) => Promise<User>;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  immer((set) => ({
    user: null,
    authorize: async (params) => {
      const {user} = await api.login(params.email, params.password);

      set((state) => {
        state.user = user;
      });

      return user;
    },
    register: async (params) => {
      const {user} = await api.register(params.name, params.email, params.password);

      set((state) => {
        state.user = user;
      });

      return user;
    },
    logout: () => {
      set((state) => {
        state.user = null;
      });

      return api.logout();
    }
  })),
);
