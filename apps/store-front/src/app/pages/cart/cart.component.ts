import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'wfh-cart',
  template: ``,
})
export class CartComponent {}

@NgModule({
  declarations: [CartComponent],
  imports: [RouterModule.forChild([{ path: '', component: CartComponent }])],
  exports: [CartComponent],
})
export class CartModule {}
