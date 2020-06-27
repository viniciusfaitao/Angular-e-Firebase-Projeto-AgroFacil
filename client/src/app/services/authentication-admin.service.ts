import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationAdminService {
  adminAutenticated: boolean = false;

  loginAdminUrl = 'http://localhost:3000/api/loginAdmin'

  constructor(private http: HttpClient, private router: Router) { }

  loginAdmin(admin){
    return this.http.post<any>(this.loginAdminUrl, admin)
  }

  adminLoggedIn(){
    return !!localStorage.getItem('tokenAdmin')
  }

  logoutAdminUser(){
    localStorage.removeItem('tokenAdmin')
    this.router.navigate(['/logar'])
  }

  getTokenAdmin(){
    return localStorage.getItem('tokenAdmin')
  }
}
