import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthenticationAdminService } from 'src/app/services/authentication-admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthenticationService, private authAdminService: AuthenticationAdminService) {}
  
  ngOnInit() {}

}
