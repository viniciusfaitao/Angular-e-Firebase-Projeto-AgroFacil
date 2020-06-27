import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  registerUserData={}

  ngOnInit() { }

  registerUser() {
    this.authenticationService.registerUser(this.registerUserData)
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
