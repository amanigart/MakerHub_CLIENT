import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginInfos } from '../../models/login-infos';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  loginField!: AbstractControl;
  passwdField!: AbstractControl;
  errorMessage!: string;
  errorMessageSubscription!: Subscription;

  constructor(
    private _builder: FormBuilder,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.errorMessageSubscription = this._auth.errorMessage$.subscribe({
      next: (data) => this.errorMessage = data,
      error: (error) => console.log(error)
    })
    this.blankForm();
    this.loginField = this.loginForm.controls['login'];
    this.passwdField = this.loginForm.controls['password'];
  }

  blankForm(): void {
    this.loginForm = this._builder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(): void {
    const model: LoginInfos = this.loginForm.value;
    this._auth.login(model);
    this.blankForm();
  }

  ngOnDestroy(): void {
    this.errorMessageSubscription.unsubscribe();
  }
}
