import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  constructor(private service: AuthService) { }

  isAuth!: boolean;
  isAuthenticatedSubscription!: Subscription;

  ngOnInit(): void {
    this.isAuth = localStorage.getItem('token') != null ? true : false;
    this.isAuthenticatedSubscription = this.service.isAuthenticated$.subscribe({
      next: (data: boolean) => this.isAuth = data,
      error: (error) => console.log(error)
    });
  }

  ngOnDestroy(): void {
    if (this.isAuthenticatedSubscription) this.isAuthenticatedSubscription.unsubscribe();
  }

  logout(): void {
    this.service.logout();
  }

}
