import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor() { }

  setToken(token: string): boolean {
    localStorage.setItem('token', token);
    return true;
  }

  getToken(): any {
    return localStorage.getItem('token');
  }

  clearToken(): void {
    localStorage.clear();
  }
}