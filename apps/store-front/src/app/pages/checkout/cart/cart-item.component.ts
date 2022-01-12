import { Component, EventEmitter, Inject, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, CURRENCY_CODE, DiscountPipeModule } from '@wfh/ui';
import { IconModule } from '../../../shared/modules/icon.module';

@Component({
  selector: 'wfh-cart-item',
  template: `
    <div class="flex items-start">
      <div class="relative">
        <img
          [src]="this.product.images[0]"
          [alt]="this.product.name"
          style="height: 150px"
          class="aspect-square object-contain p-2"
        />
      </div>
      <div class="p-4">
        <p class="text-sm font-medium text-gray-600">{{ this.product.name }}</p>
        <ng-content select="rating"></ng-content>
        <div class="mt-2">
          <div class="flex text-sm items-center">
            <p class="font-medium">{{ this.product.price | currency: this.currencyCode }}</p>
            <ng-container *ngIf="this.product.originalPrice">
              <p class="text-gray-500 text-xs line-through ml-2">
                {{ this.product.originalPrice | currency: this.currencyCode:'code':'1.0-0' }}
              </p>
            </ng-container>
          </div>
          <ng-container *ngIf="this.product.originalPrice">
            <div class="text-xs">
              <p>
                Savings
                <strong class="text-green-600">{{
                  this.product.originalPrice - this.product.price
                    | currency: this.currencyCode:'symbol-narrow':'1.0-0'
                }}</strong>
                ({{ this.product.price | discount: this.product.originalPrice }}
                <span class="text-xs">%</span>)
              </p>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
    <button
      wfh
      variant="neutral"
      size="xsmall"
      class="icon delete absolute bottom-1 right-1"
      (click)="this.delete.emit()"
    >
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

  @Output()
  delete = new EventEmitter<void>();

  constructor(@Inject(CURRENCY_CODE) public readonly currencyCode: string) {}
}

@NgModule({
  imports: [CommonModule, ButtonModule, IconModule, DiscountPipeModule],
  declarations: [CartItemComponent],
  exports: [CartItemComponent],
})
export class CartItemModule {}
