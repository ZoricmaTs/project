import React from 'react';
import type {User} from './store/useUserStore.ts';
import axiosConstructor from 'axios';

const API_URL = 'http://localhost:3000';

export class Api {
  axios = axiosConstructor.create({
    baseURL: API_URL,
    withCredentials: true,
  });

  accessToken?: string;

  setToken(accessToken: string) {
    localStorage.setItem('token', accessToken);
    this.accessToken = accessToken;
  }

  async initialize() {
    this.axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          try {
            const {data} = await this.axios.post(
              '/refresh',
              {},
              {withCredentials: true},
            );

            this.setToken(data.accessToken);

            error.config.headers.Authorization = `Bearer ${data.accessToken}`;


            return this.axios.request(error.config);
          } catch (e) {
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      },
    );
  }

  async login(email: string, password: string) {
    const res = (await this.axios.post<{ accessToken: string, user: User }>(`/login`, JSON.stringify({
        email,
        password,
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`,
        },
      })
    ).data;

    this.setToken(res.accessToken);

    return res;
  }

  async register(name: string, email: string, password: string) {
    const res = (await this.axios.post<{ user: User }>(`/register`, JSON.stringify({
        name,
        email,
        password,
      }), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).data;

    return res;
  }

  async logout() {
    await this.axios.get('/logout', {}).then(() => {
      localStorage.removeItem('token');
      this.accessToken = undefined;
    }) ;
  }
}

export const api = new Api();
export const ApiContext = React.createContext<Api>(api);