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
    <ng-container *ngFor="let section of this.sections$ | async">
      <wfh-home-section [type]="section.type" [products]="section.products"></wfh-home-section>
    </ng-container>
    <footer class="p-4 bg-white mt-10">
      <div class="w-full flex justify-center">
        <div class="flex flex-col items-center">
          <img src="assets/images/logo.svg" alt="The WFH Store" style="height:80px" />
          <p class="mt-2 font-medium text-lg">The WFH Store</p>
          <p class="text-sm text-gray-500">All your WFH needs satisfied!</p>
        </div>
      </div>
      <div class="mt-10 items-center flex flex-col">
        <ul class="flex gap-4">
          <li *ngFor="let section of this.sections$ | async">
            <a
              class="text-gray-400 font-medium cursor-pointer hover:text-primary"
              routerLink="/products"
              [queryParams]="{ filters: 'categories=' + section.products[0]?.category._id }"
            >
              {{ section.type | uppercase }}
            </a>
          </li>
        </ul>
      </div>
      <div class="flex mt-10 justify-between items-center text-xs text-gray-500">
        <p>The WFH Store | Copyright © 2022</p>
        <p>
          <a href="https://github.com/adisreyaj/wfh" target="_blank" rel="noopener noreferrer"
            >View on Github</a
          >
        </p>
      </div>
    </footer>
  `,
  styles: [
    `
      :host {
        @apply block mx-auto xl:max-w-screen-2xl;
      }
    `,
  ],
})
export class HomePage {
  sections$: Observable<{ type: string; products: any[] }[]>;

  constructor(private readonly productService: ProductsService) {
    this.sections$ = this.productService.getAllProducts({}).pipe(
      map((products) => {
        const grouped = groupBy(products, 'kind');
        return Object.keys(grouped).map((key) => ({ type: typeMap[key], products: grouped[key] }));
      })
    );
  }
}
