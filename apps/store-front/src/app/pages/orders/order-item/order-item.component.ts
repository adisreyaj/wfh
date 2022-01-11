import { Component, Inject, Input, OnInit } from '@angular/core';
import { OrderResponse } from '@wfh/api-interfaces';
import { CURRENCY_CODE } from '@wfh/ui';

@Component({
  selector: 'wfh-order-item',
  template: `
    <div class="border border-gray-200 rounded-lg">
      <header class="flex items-center justify-between p-4 text-sm text-gray-500">
        <p class="text-xs">
          #<strong class="text-sm">{{ order._id }}</strong>
        </p>
        <p>
          Ordered on: <strong>{{ order.createdAt | date: 'medium' }}</strong>
        </p>
      </header>
      <div>
        <wfh-accordion>
          <wfh-accordion-item [title]="'Products (' + order.products?.length + ')'" [isOpen]="true">
            <ng-template wfhAccordionContent>
              <ul class="flex items-center flex-wrap gap-2 mt-2 p-4">
                <li
                  *ngFor="let product of order.products"
                  class="flex flex-1 gap-4 border border-collapse p-2"
                  style="min-width: 250px;"
                >
                  <div>
                    <img
                      [src]="product.productId.images[0]"
                      class="h-20 w-20 aspect-square object-contain"
                    />
                  </div>
                  <div class="text-sm">
                    <p class="line-clamp-1">{{ product.name }}</p>
                    <p class="font-medium">
                      {{ product.price | currency: currencyCode:'symbol':'1.0-0' }}
                    </p>
                  </div>
                </li>
              </ul>
            </ng-template>
          </wfh-accordion-item>
          <wfh-accordion-item title="Breakdown" [isOpen]="false">
            <ng-template wfhAccordionContent>
              <div class="p-4">
                <table class="w-full text-xs mt-2">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <ng-container *ngFor="let item of order.breakdown">
                      <tr class="h-8">
                        <td>
                          <p class="text-gray-500">{{ item.label }}</p>
                        </td>
                        <td class="text-right">
                          <p class="font-medium">{{ item.value | currency: currencyCode }}</p>
                        </td>
                      </tr>
                    </ng-container>
                  </tbody>
                  <tfoot class="text-md">
                    <tr class="border-t h-8 border-gray-200">
                      <td>
                        <p class="font-medium">Total</p>
                      </td>
                      <td>
                        <p class="font-medium text-right">
                          {{ order.total | currency: currencyCode:'symbol':'1.0-0' }}
                        </p>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </ng-template>
          </wfh-accordion-item>
        </wfh-accordion>
      </div>
    </div>
  `,
})
export class OrderItemComponent implements OnInit {
  @Input()
  order!: OrderResponse;

  constructor(@Inject(CURRENCY_CODE) public currencyCode: string) {}

  ngOnInit(): void {}
}
