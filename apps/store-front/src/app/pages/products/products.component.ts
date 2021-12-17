import { Component, Inject, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ButtonModule,
  CURRENCY_CODE,
  FilterSidebarModule,
  ProductCardModule,
  SideSheetModule,
} from '@wfh/ui';
import { IconModule } from '../../shared/modules/icon.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wfh-products',
  template: `
    <aside>
      <wfh-filter-sidebar></wfh-filter-sidebar>
    </aside>
    <section class="px-6">
      <ul class="grid grid-cols-3 gap-4">
        <li (click)="sideSheetRef.open()">
          <wfh-product-card
            title="Helios Study Desk in Brown Colour"
            price="4000"
            originalPrice="7500"
            [images]="[
              'https://ii1.pepperfry.com/media/catalog/product/h/e/1100x1210/helios-study-desk-in-brown-colour-by-home-centre-helios-study-desk-in-brown-colour-by-home-centre-c1mgui.jpg'
            ]"
          ></wfh-product-card>
        </li>
        <li>
          <wfh-product-card
            title="Helios Study Desk in Brown Colour"
            price="4000"
            originalPrice="7500"
            [images]="[
              'https://ii1.pepperfry.com/media/catalog/product/h/e/1100x1210/helios-study-desk-in-brown-colour-by-home-centre-helios-study-desk-in-brown-colour-by-home-centre-c1mgui.jpg'
            ]"
          ></wfh-product-card>
        </li>
        <li>
          <wfh-product-card
            title="Helios Study Desk in Brown Colour"
            price="4000"
            originalPrice="7500"
            [images]="[
              'https://ii1.pepperfry.com/media/catalog/product/h/e/1100x1210/helios-study-desk-in-brown-colour-by-home-centre-helios-study-desk-in-brown-colour-by-home-centre-c1mgui.jpg'
            ]"
          ></wfh-product-card>
        </li>
        <li>
          <wfh-product-card
            title="Helios Study Desk in Brown Colour"
            price="4000"
            originalPrice="7500"
            [images]="[
              'https://ii1.pepperfry.com/media/catalog/product/h/e/1100x1210/helios-study-desk-in-brown-colour-by-home-centre-helios-study-desk-in-brown-colour-by-home-centre-c1mgui.jpg'
            ]"
          ></wfh-product-card>
        </li>
      </ul>
    </section>
    <wfh-side-sheet class="side-sheet" #sideSheetRef>
      <header class="relative">
        <section class="flex justify-center">
          <img
            src="https://ii1.pepperfry.com/media/catalog/product/h/e/1100x1210/helios-study-desk-in-brown-colour-by-home-centre-helios-study-desk-in-brown-colour-by-home-centre-c1mgui.jpg"
            alt=""
            style="max-height: 350px"
          />
        </section>
      </header>
      <div class="px-6">
        <h2 class="text-lg font-medium">Helios Study Desk</h2>
        <p class="text-gray-500 text-sm">
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type specimen book.
        </p>

        <section class="mt-2">
          <div class="flex text-2xl items-center">
            <p class="font-medium">{{ 4000 | currency: currencyCode }}</p>
            <ng-container *ngIf="true">
              <p class="text-gray-500  line-through ml-2">
                {{ 4599 | currency: currencyCode }}
              </p>
            </ng-container>
          </div>
          <ng-container *ngIf="true">
            <div class="">
              <p>
                You will save
                <strong class="text-green-600">{{ 3400 | currency: currencyCode }}</strong>
                ({{ 29 }})
                <span class="text-xs">%</span>
              </p>
            </div>
          </ng-container>
        </section>
      </div>
      <section class="mt-6 border-y border-gray-100 py-2">
        <ul class="grid grid-cols-4">
          <ng-container *ngFor="let promise of promises">
            <li class="flex flex-col items-center">
              <img [src]="'assets/images/' + promise.img" class="w-6 h-6" [alt]="promise.label" />
              <p class="text-center text-xs text-gray-600 mt-2">{{ promise.label }}</p>
            </li>
          </ng-container>
        </ul>
      </section>
      <section class="px-6 mt-6">
        <h3 class="font-medium text-md text-gray-500">Specifications</h3>
        <table class="w-full text-sm mt-2 ">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <ng-container *ngFor="let spec of specifications">
              <tr class="h-8">
                <td>
                  <p class="font-medium">{{ spec.label }}</p>
                </td>
                <td>
                  <p>{{ spec.value }}</p>
                </td>
              </tr>
            </ng-container>
          </tbody>
        </table>
      </section>
      <div class="pb-24"></div>
      <footer class="sticky w-full bottom-0 mt-4 p-6">
        <div class="w-full flex bg-white shadow-2xl">
          <button wfh class="flex-1">Buy Now</button>
          <button variant="outline" wfh class="flex-1">WishList</button>
        </div>
      </footer>
    </wfh-side-sheet>
  `,
  styles: [
    `
      :host {
        @apply grid mx-auto max-w-7xl px-4;
        grid-template-columns: 280px 1fr;
      }
    `,
  ],
})
export class ProductsPage {
  promises = [
    {
      label: '12m warranty',
      img: 'warranty.png',
    },
    {
      label: 'Easy Returns',
      img: 'easy-returns.png',
    },
    {
      label: 'Safe Delivery',
      img: 'safe-delivery.png',
    },
    {
      label: 'Free Installation',
      img: 'installation.png',
    },
  ];

  specifications = [
    {
      label: 'Dimensions',
      value: '10 x 20 x 4 cm',
    },
    {
      label: 'Weight',
      value: '10 kg',
    },
    {
      label: 'Brand',
      value: 'Home Centre',
    },
    {
      label: 'Model',
      value: 'Helios Elite',
    },
    {
      label: 'Warranty',
      value: '1 year',
    },
    {
      label: 'Color',
      value: 'Brown',
    },
  ];

  isSideSheetOpen = false;

  constructor(@Inject(CURRENCY_CODE) public currencyCode: string) {}
}

@NgModule({
  declarations: [ProductsPage],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProductsPage }]),
    FilterSidebarModule,
    ProductCardModule,
    IconModule,
    ButtonModule,
    SideSheetModule,
  ],
})
export class ProductsModule {}
