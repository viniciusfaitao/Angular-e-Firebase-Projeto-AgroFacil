import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit{
  public isLogged = false;
  public user$: Observable<any> = this.authService.afAuth.user;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(){
    this.getCurrentUser();
  }

  async onLogout(){
    try{
      await this.authService.afAuth.signOut();
      this.router.navigate(['/logar']);
    }catch(error){
      console.log(error);
    }
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe( auth => {
      if(auth){
        console.log('logged')
        this.isLogged = true
      }else{
        console.log('NOT logged')
        this.isLogged = false
        this.router.navigate(['/logar']);
      }
    })
  }

}
