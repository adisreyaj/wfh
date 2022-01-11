import { Component } from '@angular/core';
import { ProductsService } from '../products/services/products.service';
import { map, Observable } from 'rxjs';
import { groupBy } from 'lodash-es';

const typeMap: Record<string, string> = {
  ProductChair: 'chair',
  ProductMonitor: 'monitor',
  ProductDesk: 'desk',
  ProductKeyboard: 'keyboard',
  ProductMouse: 'mouse',
  ProductHeadphone: 'headphone',
};

@Component({
  selector: 'wfh-home',
  template: `
    <ng-container *ngFor="let section of sections$ | async">
      <wfh-home-section [type]="section.type" [products]="section.products"></wfh-home-section>
    </ng-container>
  `,
  styles: [
    `
      :host {
        @apply block mx-auto max-w-screen-2xl px-4 md:px-6;
      }
    `,
  ],
})
export class HomePage {
  sections$: Observable<{ type: string; products: any[] }[]>;

  constructor(private productService: ProductsService) {
    this.sections$ = this.productService.getAllProducts({}).pipe(
      map((products) => {
        const grouped = groupBy(products, 'kind');
        return Object.keys(grouped).map((key) => ({ type: typeMap[key], products: grouped[key] }));
      })
    );
  }
}
