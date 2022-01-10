import { Component, EventEmitter, Inject, Input, NgModule, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule, CURRENCY_CODE, StepIndicatorModule } from '@wfh/ui';
import { IconModule } from '../../../shared/modules/icon.module';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'wfh-cart-sidebar',
  template: `
    <section class="cart-sidebar__section">
      <header>
        <h2>Apply Coupon</h2>
      </header>
      <div class="flex gap-2">
        <input type="text" class="w-full" />
        <button wfh size="small">Apply</button>
      </div>
    </section>
    <section class="cart-sidebar__section">
      <header>
        <h2>Price Breakdown</h2>
      </header>
      <div class="flex gap-2">
        <table class="w-full text-xs mt-2 ">
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <ng-container *ngFor="let item of priceBreakdown.breakdown">
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
                  {{ priceBreakdown.total | currency: currencyCode }}
                </p>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
    <section class="cart-sidebar__section steps" *ngIf="auth.isAuthenticated$ | async">
      <wfh-step-indicator [completed]="state">
        <ng-container *ngFor="let step of steps">
          <ng-template wfh-step-indicator-item [title]="step">
            <rmx-icon name="check-line" class="icon-sm" style="fill:white"></rmx-icon>
          </ng-template>
        </ng-container>
      </wfh-step-indicator>
    </section>
    <footer class="mt-6">
      <ng-container *ngIf="auth.isAuthenticated$ | async; else login">
        <button class="w-full" wfh (click)="clicked.emit()">{{ labels[state] }}</button>
      </ng-container>
      <ng-template #login>
        <button class="w-full" wfh (click)="auth.loginWithPopup()">Login to Continue</button>
      </ng-template>
    </footer>
  `,
  styles: [
    // language=SCSS
    `
      :host {
        @apply block p-4 border border-gray-200 rounded-lg;
      }

      .cart-sidebar {
        &__section {
          @apply mb-4;
        }
      }

      header {
        @apply mb-2;
        h2 {
          @apply text-sm font-medium;
        }
      }
    `,
  ],
})
export class CartSidebarComponent {
  @Input()
  state = 0;

  @Input()
  priceBreakdown: any = [];

  @Output()
  clicked = new EventEmitter<void>();

  labels: Record<number, string> = {
    0: 'Select Address',
    1: 'Select Payment',
    2: 'Complete Order',
  };
  steps = ['Cart', 'Address', 'Payment'];

  constructor(
    public readonly auth: AuthService,
    @Inject(CURRENCY_CODE) public readonly currencyCode: string
  ) {}
}

@NgModule({
  imports: [CommonModule, ButtonModule, IconModule, StepIndicatorModule],
  declarations: [CartSidebarComponent],
  exports: [CartSidebarComponent],
})
export class CartSidebarModule {}
