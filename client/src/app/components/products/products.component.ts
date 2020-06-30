import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [AuthService]
})
export class ProductsComponent implements OnInit {

  public admin: boolean = false;
  public isLogged: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.getCurrentUser()
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.isLogged = true
      } else {
        this.isLogged = false
        this.router.navigate(['/logar']);
      }
    })
  }

}
