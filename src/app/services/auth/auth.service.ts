import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  storeUserData(userData: any): void {
    // Kullanıcı bilgilerini JSON olarak localStorage'a kaydet
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Alternatif olarak, eğer JWT token kullanıyorsanız:
    // localStorage.setItem('token', userData.token);
  }

  getUserData(): any {
    // Kullanıcı bilgilerini localStorage'dan al
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;

    // Alternatif olarak, eğer JWT token kullanıyorsanız:
    // return localStorage.getItem('token');
  }

  logout(): void {
    // Kullanıcı çıkışı yapılırsa localStorage'daki verileri temizle
    localStorage.removeItem('userData');
    // Alternatif olarak, eğer JWT token kullanıyorsanız:
    // localStorage.removeItem('token');
  }
}