import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  constructor(private service: AuthService) { }

  isAuth!: boolean;
  isAuthenticatedSubscription!: Subscription;

  ngOnInit(): void {
    this.isAuth = localStorage.getItem('token') != null ? true : false;
    this.isAuthenticatedSubscription = this.service.isAuthenticated$.subscribe({
      next: (data: boolean) => this.isAuth = data
    });
  }

  ngOnDestroy(): void {
    if (this.isAuthenticatedSubscription) this.isAuthenticatedSubscription.unsubscribe();
  }

  logout(): void {
    this.service.logout();
  }

}
