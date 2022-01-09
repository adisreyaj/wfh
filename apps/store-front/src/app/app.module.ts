import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthHttpInterceptor, AuthModule, AuthService } from '@auth0/auth0-angular';
import { CURRENCY_CODE, USER_DETAILS } from '@wfh/ui';
import { catchError, map, of } from 'rxjs';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { API_URL } from './core/tokens/api.token';
import { popperVariation, TippyModule, tooltipVariation } from '@ngneat/helipopper';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () => import('./pages/shell/shell.component').then((m) => m.ShellModule),
      },
      {
        path: 'looking-for',
        loadChildren: () =>
          import('./pages/looking-for/looking-for.module').then((m) => m.LookingForModule),
      },
    ]),
    AuthModule.forRoot({
      domain: environment.auth.domain,
      audience: environment.auth.audience,
      clientId: environment.auth.clientId,
      redirectUri: `${window.location.origin}`,
      errorPath: '/auth/login',
      cacheLocation: 'localstorage',
      useRefreshTokens: false,
      httpInterceptor: {
        allowedList: [
          {
            uri: 'api/products/*',
            httpMethod: 'GET',
          },
          {
            uri: 'api/categories/*',
            httpMethod: 'GET',
          },
          {
            uri: 'api/brands/*',
            httpMethod: 'GET',
          },
        ],
      },
    }),
    TippyModule.forRoot({
      defaultVariation: 'tooltip',
      variations: {
        tooltip: tooltipVariation,
        popper: popperVariation,
        menu: {
          ...popperVariation,
          role: 'dropdown',
          arrow: false,
          hideOnClick: true,
          zIndex: 99,
        },
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: CURRENCY_CODE,
      useValue: 'INR',
    },
    {
      provide: API_URL,
      useValue: environment.apiUrl,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: USER_DETAILS,
      useFactory: (auth: AuthService) => {
        return auth.user$.pipe(
          map((user) => {
            if (user == null) {
              return of(null);
            }
            return {
              firstName: user.given_name,
              lastName: user.family_name,
              email: user.email,
              avatar: user.picture,
            };
          }),
          catchError(() => {
            return of(null);
          })
        );
      },
      deps: [AuthService],
    },
  ],
})
export class AppModule {}
