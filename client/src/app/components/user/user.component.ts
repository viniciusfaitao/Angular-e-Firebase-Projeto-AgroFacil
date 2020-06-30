import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [AuthService]
})
export class UserComponent implements OnInit {

  public user$: Observable<any> = this.authService.afAuth.user;
  public admin: boolean = false;
  public isLogged: boolean = false;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.isLogged = true
        if (auth.email === "agrofacilcontato@gmail.com") {
          console.log("Admin Logged")
          this.admin = true;
        } else {
          this.admin = false;
        }
      } else {
        this.isLogged = false
        this.router.navigate(['/logar']);
      }
    })
  }

}
