import React from 'react';
import type {User} from './store/useUserStore.ts';

const API_URL = 'http://localhost:3000';

export class Api {
  accessToken?: string;

  setToken(accessToken: string) {
    localStorage.setItem('token', accessToken);
    this.accessToken = accessToken;
  }

  // async initialize() {
  //   this.token = localStorage.getItem('token');
  // }

  async login(email: string, password: string) {
    const res = (await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({email, password}),
    }).then(res => res.json()) as { accessToken: string, user: User });

    this.setToken(res.accessToken);

    return res;
  }

  // async logout() {
  //   localStorage.removeItem('token');
  //   this.accessToken = undefined;
  // }
}

export const api = new Api();
export const ApiContext = React.createContext<Api>(api);