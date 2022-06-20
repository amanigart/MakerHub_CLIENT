import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api/message';

import { Subscription } from 'rxjs';
import { LoginInfos } from '../../models/login-infos';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  //providers: [MessageService]
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    //private messageService: MessageService
  ) { }

  loginForm!: FormGroup;
  loginField!: AbstractControl;
  passwdField!: AbstractControl;
  errorMessage!: string;
  errorMsgAlert!: Message[];
  errorMessageSubscription!: Subscription;

  ngOnInit(): void {
    this.errorMessageSubscription = this.authService.errorMessage$.subscribe({
      next: (data) => this.errorMessage = data,
      error: (error) => console.log(error)
    });
    this.blankForm();
    this.loginField = this.loginForm.controls['login'];
    this.passwdField = this.loginForm.controls['password'];
    this.errorMsgAlert = [{severity: 'error', summary: 'Erreur', detail: `${this.errorMessage}`}];
  }

  ngOnDestroy(): void {
    this.errorMessageSubscription.unsubscribe();
  }

  blankForm(): void {
    this.loginForm = this.builder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const model: LoginInfos = this.loginForm.value;
    this.authService.login(model);
    this.blankForm();
  }

  // displayLoginErrorMessage(): void {
  //   this.messageService.add({severity: 'error', summary: 'Erreur', detail: `${this.errorMessage}`})
  // }
}
