import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationAdminService } from './services/authentication-admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  
  constructor(private authService: AuthenticationService, private authAdminService: AuthenticationAdminService, private router: Router) {}

  ngOnInit(){
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
