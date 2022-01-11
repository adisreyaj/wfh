import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  template: `
    <header class="mb-4">
      <h1 class="text-2xl font-semibold">My Orders</h1>
      <p>
        Here are all the orders you've made! Make use of the search box to find a particular order
      </p>
    </header>
  `,
  styles: [
    `
      :host {
        @apply block mx-auto max-w-screen-2xl px-4 md:px-6;
      }
    `,
  ],
})
export class OrdersComponent {}

@NgModule({
  declarations: [OrdersComponent],
  imports: [RouterModule.forChild([{ path: '', component: OrdersComponent }])],
  exports: [OrdersComponent],
})
export class OrdersModule {}
