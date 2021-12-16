import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.component';

@NgModule({
  declarations: [HomePage],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
