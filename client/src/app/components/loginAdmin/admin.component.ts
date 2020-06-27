import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationAdminService } from 'src/app/services/authentication-admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {
  loginAdminData = {};

  constructor(private authAdminService: AuthenticationAdminService, private router: Router) {}

  ngOnInit(){}
    
  loginAdmin() {
    this.authAdminService.loginAdmin(this.loginAdminData)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('tokenAdmin', res.tokenAdmin)
        this.router.navigate(['/'])

      },
      err => console.log(err)
    )
  }
  
}
