import { Component, ElementRef, NgModule, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconModule } from '../../../../../../libs/ui/src/components/icon.module';
import { BehaviorSubject, catchError, Observable, of, switchMap, tap } from 'rxjs';
import { LoaderService, OrderService } from '@wfh/store-front/service';
import { OrderResponse } from '@wfh/api-interfaces';
import { CommonModule } from '@angular/common';
import { OrderItemComponent } from './order-item/order-item.component';
import { AccordionModule } from '../../../../../../libs/ui/src/components/accordion/accordion.module';
import { ButtonModule, StepIndicatorModule } from '@wfh/ui';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  template: `
    <header class="mb-4">
      <h1 class="text-2xl font-semibold">My Orders</h1>
      <p class="text-gray-500">
        Here are all the orders you've made! Make use of the search box to find a particular order
      </p>
    </header>
    <section>
      <div class="flex items-center gap-2 relative">
        <div class="form-group max-w-sm relative" style="padding-bottom: 0;">
          <div class="absolute h-full left-2 top-0 grid place-items-center">
            <rmx-icon name="search-2-line"></rmx-icon>
          </div>
          <input
            [(ngModel)]="this.searchQuery"
            class="w-full pl-8"
            type="text"
            id="order-search"
            placeholder="Search Orders"
          />
        </div>
        <button
          wfh
          size="small"
          [disabled]="this.loading$ | async"
          (click)="this.searchQuerySubject.next(this.searchQuery)"
        >
          Search
        </button>
        <button
          wfh
          variant="neutral"
          size="small"
          [disabled]="this.loading$ | async"
          (click)="this.searchQuerySubject.next(''); this.searchQuery = ''"
        >
          Clear
        </button>
      </div>
    </section>
    <section class="flex flex-col gap-4 mt-6">
      <ng-container *ngIf="this.orders$ | async as orders">
        <ng-container *ngIf="orders && orders.length > 0; else noOrders">
          <ng-container *ngFor="let order of orders">
            <wfh-order-item [order]="order"></wfh-order-item>
          </ng-container>
        </ng-container>
      </ng-container>
      <ng-template #noOrders>
        <section class="flex flex-col items-center w-full h-full">
          <img src="assets/images/no-orders.svg" alt="Shopping" [style.height.px]="300" />
          <p class="mb-4 text-lg text-center font-semibold">
            No orders found.<br />
            <span class="text-gray-500 text-sm">
              Go buy something or try changing the search term.</span
            >
          </p>
        </section>
      </ng-template>
    </section>
  `,
  styles: [
    `
      :host {
        @apply block mx-auto max-w-screen-2xl px-4 md:px-6;
      }

      .rmx-icon {
        width: 20px;
        height: 20px;
        @apply fill-gray-600;
      }
    `,
  ],
})
export class OrdersComponent {
  readonly orders$: Observable<OrderResponse[]>;
  searchQuery = '';
  readonly searchQuerySubject = new BehaviorSubject<string>('');
  @ViewChild('searchRef', { static: true })
  private searchRef!: ElementRef<HTMLInputElement>;
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loadingSubject
    .asObservable()
    .pipe(tap((isLoading) => this.loader.update(isLoading)));

  constructor(private orderService: OrderService, private loader: LoaderService) {
    this.orders$ = this.searchQuerySubject.asObservable().pipe(
      tap(() => {
        this.loadingSubject.next(true);
      }),
      switchMap((query) => this.orderService.getOrders(query)),
      tap(() => {
        this.loadingSubject.next(false);
      }),
      catchError(() => {
        this.loadingSubject.next(false);
        return of([]);
      })
    );
  }
}

@NgModule({
  declarations: [OrdersComponent, OrderItemComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: OrdersComponent }]),
    IconModule,
    AccordionModule,
    ButtonModule,
    FormsModule,
    StepIndicatorModule,
  ],
  exports: [OrdersComponent],
})
export class OrdersModule {}
