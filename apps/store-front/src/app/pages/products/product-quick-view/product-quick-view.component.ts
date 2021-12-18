import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { CURRENCY_CODE, SideSheetComponent } from '@wfh/ui';
import { ProductPromise, ProductSpecification } from '../products.interface';

@Component({
  selector: 'wfh-product-quick-view',
  template: `
    <wfh-side-sheet #sideSheetRef class="side-sheet">
      <header class="relative">
        <section class="flex justify-center">
          <img
            alt=""
            src="https://ii1.pepperfry.com/media/catalog/product/h/e/1100x1210/helios-study-desk-in-brown-colour-by-home-centre-helios-study-desk-in-brown-colour-by-home-centre-c1mgui.jpg"
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

        <section class="mt-4">
          <div class="flex text-2xl items-center">
            <p class="font-medium">{{ 4000 | currency: currencyCode }}</p>
            <ng-container *ngIf="true">
              <p class="text-gray-500 text-base line-through ml-2">
                {{ 4599 | currency: currencyCode }}
              </p>
            </ng-container>
          </div>
          <ng-container *ngIf="true">
            <div class="">
              <p>
                You will save
                <strong class="text-green-600">{{ 3400 | currency: currencyCode }}</strong>
                ({{ 29 }} <span class="text-xs">%</span>)
              </p>
            </div>
          </ng-container>
        </section>
      </div>
      <section class="mt-6 border-y border-gray-100 py-2">
        <ul class="grid grid-cols-4">
          <ng-container *ngFor="let promise of promises">
            <li class="flex flex-col items-center">
              <img [alt]="promise.label" [src]="'assets/images/' + promise.img" class="w-6 h-6" />
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
          <button class="flex-1" wfh>Buy Now</button>
          <button class="flex-1" variant="outline" wfh>WishList</button>
        </div>
      </footer>
    </wfh-side-sheet>
  `,
})
export class ProductQuickViewComponent implements OnInit {
  @Input()
  promises: ProductPromise[] = [];

  @Input()
  specifications: ProductSpecification[] = [];

  @ViewChild(SideSheetComponent) sideSheetRef?: SideSheetComponent;

  constructor(@Inject(CURRENCY_CODE) public currencyCode: string) {}

  ngOnInit(): void {}

  open() {
    this.sideSheetRef?.open();
  }

  close() {
    this.sideSheetRef?.close();
  }
}
