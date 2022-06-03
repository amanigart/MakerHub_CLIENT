import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './core/components/authentication/authentication.component';
import { AuthService } from './core/services/auth.service';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

// PrimeNG
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { NavComponent } from './core/components/nav/nav.component';
import { SideMenuComponent } from './core/components/side-menu/side-menu.component';
import { WebsiteLayoutComponent } from './core/layouts/website-layout/website-layout.component';
import { AppLayoutComponent } from './core/layouts/app-layout/app-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    NavComponent,
    SideMenuComponent,
    WebsiteLayoutComponent,
    AppLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // PrimeNg
    InputTextModule,
    ButtonModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
