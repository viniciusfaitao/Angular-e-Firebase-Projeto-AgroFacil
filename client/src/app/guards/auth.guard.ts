import { Injectable } from '@angular/core';
import {CanActivate,Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AuthenticationAdminService } from '../services/authentication-admin.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthenticationService, private router: Router, private authAdminService: AuthenticationAdminService) { }
  
    canActivate() {
        if(this.authService.loggedIn()){
            return true
        }else if(this.authAdminService.adminLoggedIn()){
            return true
        }else{
            this.router.navigate(['/logar'])
            return false
        }
    }

}
