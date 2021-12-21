import { Component, Inject, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, CURRENCY_CODE, DiscountPipeModule } from '@wfh/ui';
import { IconModule } from '../../../shared/modules/icon.module';

@Component({
  selector: 'wfh-cart-item',
  template: `
    <div class="flex items-start">
      <div class="relative">
        <img [src]="product.images[0]" [alt]="product.title" style="height: 150px" />
      </div>
      <div class="p-4">
        <p class="text-sm font-medium text-gray-600">{{ product.title }}</p>
        <ng-content select="rating"></ng-content>
        <div class="mt-2">
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
                You save
                <strong class="text-green-600">{{ '3400' | currency: currencyCode }}</strong>
              </p>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
    <button wfh variant="neutral" size="xsmall" class="icon delete absolute bottom-1 right-1">
      <rmx-icon name="delete-bin-5-fill" class="icon-xs"></rmx-icon>
    </button>
  `,
  styles: [
    `
      :host {
        @apply relative flex justify-between border border-gray-200 gap-4 rounded-lg;
      }

      button.delete rmx-icon {
        @apply fill-red-500;
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
