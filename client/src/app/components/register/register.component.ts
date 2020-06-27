import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent {

  public isLogged = false;
  public user: any;

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {}

  async onRegister(){
    const {email, password} = this.registerForm.value;
    try{
      const user = await this.authService.register(email, password);
      if(user){
        this.router.navigate(['/home'])
      }
    }catch(error){
      console.log(error);
    }
  }

}
