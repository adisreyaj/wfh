import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@wfh/ui';

@Component({
  selector: 'wfh-cart-sidebar',
  template: `
    <section class="cart-sidebar__section">
      <header>
        <h2>Apply Coupon</h2>
      </header>
      <div class="flex gap-2">
        <input type="text" class="w-full" />
        <button wfh size="small">Apply</button>
      </div>
    </section>
    <section class="cart-sidebar__section">
      <header>
        <h2>Price Breakdown</h2>
      </header>
      <div class="flex gap-2">
        <table class="w-full text-xs mt-2 ">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <ng-container *ngFor="let item of priceBreakdown">
              <tr class="h-8">
                <td>
                  <p class="text-gray-500">{{ item.label }}</p>
                </td>
                <td>
                  <p class="font-medium">{{ item.value }}</p>
                </td>
              </tr>
            </ng-container>
          </tbody>
          <tfoot class="text-md">
            <tr class="border-t h-8 border-gray-200">
              <td>
                <p class="text-gray-500">Total</p>
              </td>
              <td>
                <p class="font-medium">3000</p>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
    <footer>
      <button class="w-full" wfh>Place Order</button>
    </footer>
  `,
  styles: [
    // language=SCSS
    `
      :host {
        @apply block p-4;
      }

      .cart-sidebar {
        &__section {
          @apply mb-4;
        }
      }

      header {
        @apply mb-2;
        h2 {
          @apply text-sm font-medium;
        }
      }
    `,
  ],
})
export class CartSidebarComponent {
  priceBreakdown = [
    {
      label: 'Cart Value',
      value: '$100',
    },
    {
      label: 'Discount',
      value: '$10',
    },
    {
      label: 'Shipping',
      value: '$10',
    },
    {
      label: 'Tax/VAT',
      value: '$10',
    },
  ];
}

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [CartSidebarComponent],
  exports: [CartSidebarComponent],
})
export class CartSidebarModule {}
