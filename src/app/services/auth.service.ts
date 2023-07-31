import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from './base-url';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(token: string) {
    const url = `${BASE_URL}/user`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return this.http.get<User>(url, config);
  }

  register(user: User) {
    const url = `${BASE_URL}/signup`;
    return this.http.post<any>(url, user);
  }

  login(email: string, password: string) {
    const url = `${BASE_URL}/signin`;
    const requestBody = { email, password };
    return this.http.post<any>(url, requestBody);
  }

  logout(token: string) {
    const url = `${BASE_URL}/logout`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return this.http.post<any>(url, config);
  }
}
