import { Component, Inject, Input, NgModule, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.component';
import { DiscountPipeModule } from '../../pipes';
import { CURRENCY_CODE } from '../../common';
import { isNil } from 'lodash-es';
import { IconModule } from '../icon.module';

@Component({
  selector: 'wfh-product-card',
  template: `
    <header class="relative">
      <button class="absolute -right-1 -top-1">
        <rmx-icon name="heart-3-line"></rmx-icon>
      </button>
      <ng-container *ngIf="images">
        <img [src]="images[0]" [alt]="title" />
      </ng-container>
    </header>
    <div>
      <p class="text-sm font-medium">{{ title }}</p>
      <ng-content select="rating"></ng-content>
      <div class="mt-2">
        <p class="text-xs text-gray-500">Price</p>
        <div class="flex text-sm items-center">
          <p class="font-medium">{{ price | currency: currencyCode }}</p>
          <ng-container *ngIf="originalPrice">
            <p class="text-gray-500 text-xs line-through ml-2">
              {{ originalPrice | currency: currencyCode }}
            </p>
          </ng-container>
        </div>
        <ng-container *ngIf="originalPrice">
          <div class="text-xs">
            <p>
              You will save
              <strong class="text-green-600">{{ priceDifference | currency: currencyCode }}</strong>
              ({{ price | discount: originalPrice }})
              <span class="text-xs">%</span>
            </p>
          </div>
        </ng-container>
      </div>
    </div>
    <footer class="flex items-center gap-2 mt-4">
      <button wfh variant="outline" size="small" class="flex-1">Add to cart</button>
    </footer>
  `,
  styles: [
    `
      :host {
        @apply block border border-gray-200 p-4;
        @apply hover:shadow-xl;
      }
    `,
  ],
})
export class ProductCardComponent implements OnChanges {
  @Input()
  images?: string[];

  @Input()
  title!: string;

  @Input()
  price!: string;

  @Input()
  originalPrice?: string;

  @Input()
  subtitle?: string;

  @Input()
  link?: string;

  public priceDifference = -1;

  constructor(@Inject(CURRENCY_CODE) public currencyCode: string) {}

  ngOnChanges(changes: SimpleChanges): void {
    const {
      originalPrice: { currentValue: originalPrice },
      price: { currentValue: price },
    } = changes;
    if (!isNil(price) && !isNil(originalPrice)) {
      this.priceDifference = originalPrice - price;
    }
  }
}

@NgModule({
  declarations: [ProductCardComponent],
  imports: [CommonModule, DiscountPipeModule, ButtonModule, IconModule],
  exports: [ProductCardComponent],
})
export class ProductCardModule {}
