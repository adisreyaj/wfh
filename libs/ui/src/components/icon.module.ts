import { NgModule } from '@angular/core';
import {
  RemixIconModule,
  RiCloseLine,
  RiEyeLine,
  RiHeart3Line,
  RiNotification4Fill,
  RiShoppingCart2Fill,
} from 'angular-remix-icon';

const ICONS = {
  RiNotification4Fill,
  RiShoppingCart2Fill,
  RiEyeLine,
  RiHeart3Line,
  RiCloseLine,
};

@NgModule({
  imports: [RemixIconModule.configure(ICONS)],
  exports: [RemixIconModule],
})
export class IconModule {}
