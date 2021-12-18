import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule, DiscountPipeModule } from '@wfh/ui';
import { IconModule } from '../../../shared/modules/icon.module';
import { CommonModule } from '@angular/common';
import { CartItemModule } from './cart-item.component';
import { CartSidebarModule } from './cart-sidebar.component';

@Component({
  selector: 'wfh-cart',
  template: `
    <section class="flex-1">
      <header>
        <h2 class="text-xl font-bold text-gray-500">In Cart</h2>
      </header>
      <section class="grid lg:grid-cols-2 gap-4">
        <article class="mt-4 border border-gray-200 p-4">
          <header class="mb-4">
            <h3 class="text-base font-semibold">Desk</h3>
          </header>
          <div class="flex flex-col gap-2">
            <section class="">
              <wfh-cart-item [product]="product"></wfh-cart-item>
            </section>
          </div>
        </article>
        <article class="mt-4 border border-gray-200 p-4">
          <header class="mb-4">
            <h3 class="text-base font-semibold">Chair</h3>
          </header>
          <div class="flex flex-col gap-2">
            <section class="">
              <wfh-cart-item [product]="product"></wfh-cart-item>
            </section>
          </div>
        </article>
        <article class="mt-4 border border-gray-200 p-4">
          <header class="mb-4">
            <h3 class="text-base font-semibold">Monitor</h3>
          </header>
          <div class="flex flex-col gap-2">
            <section class="">
              <wfh-cart-item [product]="product"></wfh-cart-item>
            </section>
          </div>
        </article>
      </section>
    </section>
    <aside class="cart__sidebar">
      <wfh-cart-sidebar></wfh-cart-sidebar>
    </aside>
  `,
  styles: [
    // language=SCSS
    `
      :host {
        @apply flex max-w-7xl mx-auto px-6 pb-10;
      }

      .cart {
        &__sidebar {
          width: 380px;
        }
      }
    `,
  ],
})
export class CartComponent {
  product = {
    title: 'Helios Study Desk in Brown Colour',
    price: 4000,
    originalPrice: 7500,
    images: [
      'https://ii1.pepperfry.com/media/catalog/product/h/e/1100x1210/helios-study-desk-in-brown-colour-by-home-centre-helios-study-desk-in-brown-colour-by-home-centre-c1mgui.jpg',
    ],
  };
}

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CartComponent }]),
    ButtonModule,
    IconModule,
    DiscountPipeModule,
    CartItemModule,
    CartSidebarModule,
  ],
  exports: [CartComponent],
})
export class CartModule {}
