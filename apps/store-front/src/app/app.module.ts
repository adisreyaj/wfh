import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CURRENCY_CODE } from '@wfh/ui';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, AppRoutingModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: CURRENCY_CODE,
      useValue: 'INR',
    },
  ],
})
export class AppModule {}
