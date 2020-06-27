import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {}
  
  async onLogin(){
    const {email, password} = this.loginForm.value;
    try{
      const user = await this.authService.login(email, password);
      if(user){
        this.router.navigate(['/produtos']);
      }
    }catch(error){
      console.log(error);
    }
  }
}
