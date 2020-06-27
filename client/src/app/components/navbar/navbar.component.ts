import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})
export class NavbarComponent{
  public isLogged = false;
  public user$: Observable<any> = this.authService.afAuth.user;

  constructor(private authService: AuthService, private router: Router) {}
  
  async onLogout(){
    try{
      await this.authService.logout();
      this.router.navigate(['/logar']);
    }catch(error){
      console.log(error);
    }
  }

}
