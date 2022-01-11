import { Component, Inject, Input } from '@angular/core';
import { CURRENCY_CODE } from '@wfh/ui';

@Component({
  selector: 'wfh-home-section',
  template: `
    <section [style.height.px]="500" class="relative">
      <picture class="object-fill">
        <source [srcset]="'assets/images/' + type + '.webp'" type="image/webp" />
        <img class="w-full h-full" [src]="'assets/images/' + type + '.jpeg'" [alt]="type" />
      </picture>
      <div
        class="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-transparent via-gray-900 to-black opacity-80"
      ></div>
      <p class="text-white text-5xl font-semibold absolute top-4 left-4">{{ type | uppercase }}</p>
      <div class="absolute z-10 top-0 lef-0 h-full w-full flex p-6">
        <ul class="flex items-end justify-end w-full gap-4">
          <li
            routerLink="/products"
            [queryParams]="{ q: product.name }"
            *ngFor="let product of products | slice: 0:5"
            class="p-2 bg-white rounded-md cursor-pointer hover:-translate-y-1 shadow-lg hover:shadow-2xl transition-all duration-200"
            style="max-width: 200px;"
          >
            <header>
              <img [src]="product.images[0]" [alt]="product.name" class="h-40 object-contain" />
              <p class="line-clamp-2 text-sm font-medium">{{ product?.name }}</p>
            </header>
            <div>
              <div class="mt-2">
                <p class="text-xs text-gray-500">Price</p>
                <div class="flex text-sm items-center">
                  <p class="font-medium">{{ product.price | currency: currencyCode }}</p>
                </div>
              </div>
            </div>
          </li>
          <li
            class="grid place-items-center"
            [style.height.px]="270"
            routerLink="/products"
            [queryParams]="{ filters: 'categories=' + products[0]?.category._id }"
          >
            <div
              class="bg-white p-2 cursor-pointer rounded-full hover:-translate-y-1 shadow-lg hover:shadow-2xl transition-all duration-200"
            >
              <rmx-icon name="arrow-right-line"></rmx-icon>
            </div>
          </li>
        </ul>
      </div>
    </section>
  `,
})
export class HomeSectionComponent {
  @Input()
  type!: string;

  @Input()
  products!: any[];

  constructor(@Inject(CURRENCY_CODE) public currencyCode: string) {}
}
