import { Component, Inject, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, CURRENCY_CODE, DiscountPipeModule } from '@wfh/ui';
import { IconModule } from '../../../shared/modules/icon.module';

@Component({
  selector: 'wfh-cart-item',
  template: `
    <div class="flex items-center gap-4">
      <div class="relative">
        <img [src]="product.images[0]" [alt]="product.title" style="height: 150px" />
      </div>
      <div>
        <p class="text-sm font-medium">{{ product.title }}</p>
        <ng-content select="rating"></ng-content>
        <div class="mt-2">
          <p class="text-xs text-gray-500">Price</p>
          <div class="flex text-sm items-center">
            <p class="font-medium">{{ product.price | currency: currencyCode }}</p>
            <ng-container *ngIf="product.originalPrice">
              <p class="text-gray-500 text-xs line-through ml-2">
                {{ product.originalPrice | currency: currencyCode }}
              </p>
            </ng-container>
          </div>
          <ng-container *ngIf="product.originalPrice">
            <div class="text-xs">
              <p>
                You will save
                <strong class="text-green-600">{{ '3400' | currency: currencyCode }}</strong>
                ({{ product.price | discount: product.originalPrice }})
                <span class="text-xs">%</span>
              </p>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
    <div>
      <button wfh variant="neutral" size="xsmall" class="icon">
        <rmx-icon name="delete-bin-5-fill" class="icon-xs"></rmx-icon>
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        @apply flex justify-between gap-4;
      }
    `,
  ],
})
export class CartItemComponent {
  @Input()
  product: any;

  constructor(@Inject(CURRENCY_CODE) public currencyCode: string) {}
}

@NgModule({
  imports: [CommonModule, ButtonModule, IconModule, DiscountPipeModule],
  declarations: [CartItemComponent],
  exports: [CartItemComponent],
})
export class CartItemModule {}
