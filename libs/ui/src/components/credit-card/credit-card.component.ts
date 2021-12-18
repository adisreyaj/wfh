import {
  ChangeDetectionStrategy,
  Component,
  Input,
  NgModule,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CardNumberVerification } from 'card-validator/dist/card-number';
import { CommonModule } from '@angular/common';
import { number as numberValidator } from 'card-validator';

@Component({
  selector: 'wfh-credit-card',
  template: `
    <img
      *ngIf="cardImage$ | async as cardLogo"
      class="m-2 bg-white"
      [src]="cardLogo"
      alt="Visa"
      style="height:30px"
    />
    <div class="p-4 pt-0 flex-1 flex flex-col w-full">
      <div class="flex-1 items-end flex">
        <p class="font-mono text-lg tracking-widest font-semibold">
          {{ number | slice: 0:4 }}&nbsp;{{ number | slice: 4:8 }}&nbsp;{{
            number | slice: 8:12
          }}&nbsp;{{ number | slice: 12 }}
        </p>
      </div>
      <footer class="flex items-center text-sm justify-between mt-4">
        <p class="uppercase text-md font-semibold">{{ name }}</p>
        <div class="font-mono">{{ expiry }}</div>
      </footer>
    </div>
  `,
  styles: [
    `
      :host {
        @apply flex flex-col items-start;
        min-height: 180px;
      }

      :host-context([data-id='1']) {
        background-image: linear-gradient(to bottom, #a18cd1 0%, #fbc2eb 100%);
      }

      :host-context([data-id='2']) {
        background-image: linear-gradient(to bottom, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
      }

      :host-context([data-id='3']) {
        background-image: linear-gradient(to bottom, #84fab0 0%, #8fd3f4 100%);
      }

      :host-context([data-id='4']) {
        background-image: linear-gradient(to bottom, #d299c2 0%, #fef9d7 100%);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditCardComponent implements OnChanges {
  @Input()
  number!: string;

  @Input()
  name!: string;

  @Input()
  expiry!: string;

  @Input()
  cvc!: string;

  cardInfo$ = new BehaviorSubject<CardNumberVerification | null>(null);
  cardImage$ = this.cardInfo$.pipe(
    map((data) => {
      if (data?.isPotentiallyValid && data.card?.type) {
        return `https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/logo/${data.card.type}.svg`;
      }
      return null;
    })
  );

  ngOnChanges(changes: SimpleChanges): void {
    const cardNumber = changes.number?.currentValue;
    if (cardNumber != null && cardNumber?.length > 4) {
      this.cardInfo$.next(numberValidator(cardNumber));
    }
  }
}

@NgModule({
  declarations: [CreditCardComponent],
  imports: [CommonModule],
  exports: [CreditCardComponent],
})
export class CreditCardModule {}
