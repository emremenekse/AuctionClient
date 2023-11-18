import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  storeUserData(userData: any): void {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  logout(): void {
    localStorage.removeItem('userData');
  }
}