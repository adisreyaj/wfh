import { NgModule } from '@angular/core';
import { RemixIconModule, RiCheckboxCircleFill } from 'angular-remix-icon';

const ICONS = {
  RiCheckboxCircleFill,
};

@NgModule({
  imports: [RemixIconModule.configure(ICONS)],
  exports: [RemixIconModule],
})
export class IconModule {}
