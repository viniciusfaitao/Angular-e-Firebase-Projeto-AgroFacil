import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent {

  public isLogged: boolean = false;

  registerForm = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getCurrentUser()
  }

  async onRegister(){
    const {email, password} = this.registerForm.value;
    try{
      this.authService.register(email, password);
    }catch(error){
      console.log(error);
    }
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.isLogged = true
        this.router.navigate(['/produtos']);
      } else {
        this.isLogged = false
        this.router.navigate(['/logar']);
      }
    })
  }

}
