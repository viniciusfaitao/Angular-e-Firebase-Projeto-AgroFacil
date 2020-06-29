import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  providers: [AuthService]
})
export class ProductAddComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
