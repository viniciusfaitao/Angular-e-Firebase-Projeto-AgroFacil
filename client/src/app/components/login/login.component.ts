import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  public isLogged = false;
  public user: any;

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private router: Router, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      this.authService.loginEmailUser(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  onLoginFacebook() {
    try {
      this.authService.loginFacebookUser();
    } catch (error) {
      console.log(error);
    }
  }

  onLoginGoogle() {
    try {
      this.authService.loginGoogleUser();
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/produtos']);
        this.isLogged = true
      } else {
        this.isLogged = false
        this.router.navigate(['/logar']);
      }
    })
  }
}
