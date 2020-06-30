import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  providers: [AuthService]
})
export class ProductAddComponent implements OnInit {

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
        if(auth.email === "agrofacilcontato@gmail.com"){
          console.log("Admin Logged")
          this.admin = true;
        }else{
          this.admin = false;
          this.router.navigate(['/produtos']);
        }
      } else {
        this.isLogged = false
        this.router.navigate(['/logar']);
      }
    })
  }
}
