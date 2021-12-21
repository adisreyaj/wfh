import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'wfh-checkout',
  template: ``,
})
export class CheckoutComponent {}

@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: CheckoutComponent },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.component').then((m) => m.CartModule),
      },
    ]),
  ],
  exports: [CheckoutComponent],
})
export class CheckoutModule {}
