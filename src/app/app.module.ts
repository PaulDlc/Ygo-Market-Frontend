import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import localeES from '@angular/common/locales/es';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './usuario/login/login.component';
import { UsuarioComponent } from './usuario/usuario/usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { TokenInterceptor } from './usuario/interceptors/token.interceptor';
import { AuthInterceptor } from './usuario/interceptors/auth.interceptor';

registerLocaleData(localeES, 'es-Pe');

const routes: Routes = []

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    UsuarioComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top'
    })
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'es-Pe' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
