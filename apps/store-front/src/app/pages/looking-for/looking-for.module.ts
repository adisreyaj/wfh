import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '@wfh/ui';
import { IconModule } from '../../shared/modules/icon.module';
import { LookingForRoutingModule } from './looking-for-routing.module';
import { LookingForPage } from './looking-for.component';

@NgModule({
  declarations: [LookingForPage],
  imports: [CommonModule, LookingForRoutingModule, ButtonModule, IconModule],
})
export class LookingForModule {}
