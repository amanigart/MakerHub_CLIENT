import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private service: AuthService) { }

  ngOnInit(): void {

  }

  logout(): void {
    this.service.logout();
  }

}
