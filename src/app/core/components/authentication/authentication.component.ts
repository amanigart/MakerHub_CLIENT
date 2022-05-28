import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInfos } from '../../models/login-infos';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private _builder: FormBuilder,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.blankForm();
  }

  blankForm(): void {
    this.loginForm = this._builder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(): void {
    const model: LoginInfos = this.loginForm.value;
    //this._auth.login(model);
    console.log(model);
    this.blankForm();
  }

}
