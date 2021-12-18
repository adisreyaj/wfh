import { NgModule } from '@angular/core';
import { RemixIconModule, RiCheckboxCircleFill, RiDeleteBin5Fill } from 'angular-remix-icon';

const ICONS = {
  RiCheckboxCircleFill,
  RiDeleteBin5Fill,
};

@NgModule({
  imports: [RemixIconModule.configure(ICONS)],
  exports: [RemixIconModule],
})
export class IconModule {}
