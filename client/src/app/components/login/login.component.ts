import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginUserData = {};

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit(){}
    
  loginUser() {
    this.authenticationService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this.router.navigate(['/produtos'])

      },
      err => console.log(err)
    )
  }

}
