import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API_URI = 'http://localhost:5555';

  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<User[]>(`${this.API_URI}/users`);
  }

  getAll() {
    return this.http.get<User[]>('/users');
  }

  getById(id: number) {
    return this.http.get(`${this.API_URI}/users/${id}`);
  }

  register(user: User) {
    return this.http.post(`${this.API_URI}/users`, user);
  }

  update(id: string | number, updatedUser: User): Observable<User>{
    return this.http.put<User>(`${this.API_URI}/users/${id}`, updatedUser);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URI}/users/${id}`);
  }
}
