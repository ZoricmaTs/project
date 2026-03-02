import React from 'react';

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
    return fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
      body: JSON.stringify({ email, password }),
    }).then(res => res.json());
  }
}

export const ApiContext = React.createContext<Api | null>(null);