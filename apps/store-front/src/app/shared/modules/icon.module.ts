import { NgModule } from '@angular/core';
import {
  RemixIconModule,
  RiAddLine,
  RiArrowRightLine,
  RiCheckboxCircleFill,
  RiCheckLine,
  RiDeleteBin5Fill,
  RiEdit2Line,
} from 'angular-remix-icon';

const ICONS = {
  RiCheckboxCircleFill,
  RiDeleteBin5Fill,
  RiCheckLine,
  RiArrowRightLine,
  RiAddLine,
  RiEdit2Line,
};

@NgModule({
  imports: [RemixIconModule.configure(ICONS)],
  exports: [RemixIconModule],
})
export class IconModule {}
