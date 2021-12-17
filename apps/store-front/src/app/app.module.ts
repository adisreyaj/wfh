import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CURRENCY_CODE } from '@wfh/ui';
import { RouterModule } from '@angular/router';

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
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: CURRENCY_CODE,
      useValue: 'INR',
    },
  ],
})
export class AppModule {}
