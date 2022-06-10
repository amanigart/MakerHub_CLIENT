import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private service: AuthService) { }

  ngOnInit(): void {

  }

  logout(): void {
    this.service.logout();
  }

}
