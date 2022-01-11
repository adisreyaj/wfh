import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.component';
import { HomeSectionComponent } from './home-section/home-section.component';
import { ButtonModule } from '@wfh/ui';
import { IconModule } from '../../shared/modules/icon.module';
import { TippyModule } from '@ngneat/helipopper';

@NgModule({
  declarations: [HomePage, HomeSectionComponent],
  imports: [CommonModule, HomeRoutingModule, ButtonModule, IconModule, TippyModule],
})
export class HomeModule {}
