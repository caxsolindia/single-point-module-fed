import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn: boolean = false;
  private _user: User | undefined;
  private _token: string | null;

  constructor(private readonly router: Router) {
    this._token = sessionStorage.getItem('accessToken');
    const data = sessionStorage.getItem('userData');
    if (data && this._token) {
      this._isLoggedIn = true;
      this._user = JSON.parse(data);
    }
  }

  public getToken(): string | null {
    return this._token;
  }
  public setToken(value: string | null) {
    this._token = value;
  }

  public getUser(): User | undefined {
    return this._user;
  }

  public setUser(value: User | undefined) {
    this._user = value;
  }

  public getisLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  public setisLoggedIn(value: boolean) {
    this._isLoggedIn = value;
  }

  login(user: User) {
    this.setisLoggedIn(true);
    this._user = user;
    this.router.navigate(['/home']);
  }

  logout() {
    this.setisLoggedIn(false);
    this._user = undefined;
    sessionStorage.removeItem('userData');
    this._token = null;
    sessionStorage.removeItem('accessToken');
    this.router.navigate(['/authapp']);
  }
}
