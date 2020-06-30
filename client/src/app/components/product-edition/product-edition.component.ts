import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.css'],
  providers: [AuthService]
})
export class ProductEditionComponent implements OnInit {

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
