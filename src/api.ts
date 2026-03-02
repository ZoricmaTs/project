import React from 'react';
import type {User} from './store/useUserStore.ts';

const API_URL = 'http://localhost:3000';

export class Api {
  token?: string;

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token = token;
  }

  // async initialize() {
  //   this.token = localStorage.getItem('token');
  // }

  async login(email: string, password: string) {
    const res = (await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify({email, password}),
    }).then(res => res.json()) as { token: string, user: User });

    this.setToken(res.token);

    return res;
  }

  async logout() {
    localStorage.removeItem('token');
    this.token = undefined;
  }
}

export const api = new Api();
export const ApiContext = React.createContext<Api>(api);