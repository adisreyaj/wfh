import { NgModule } from '@angular/core';
import { RemixIconModule, RiNotification4Fill, RiShoppingCart2Fill } from 'angular-remix-icon';

const ICONS = {
  RiNotification4Fill,
  RiShoppingCart2Fill,
};

@NgModule({
  imports: [RemixIconModule.configure(ICONS)],
  exports: [RemixIconModule],
})
export class IconModule {}
