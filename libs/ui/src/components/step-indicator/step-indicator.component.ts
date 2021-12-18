import {
  Component,
  ContentChildren,
  Directive,
  Input,
  NgModule,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Directive({
  selector: '[wfh-step-indicator-item]',
})
export class StepIndicatorItem {
  @Input()
  title!: string;

  constructor(public tpl: TemplateRef<unknown>) {}
}

@Component({
  selector: 'wfh-step-indicator',
  template: `
    <div
      class="grid items-center relative"
      [style.grid-template-columns]="'repeat(' + stepsArray.length + ',1fr)'"
    >
      <ng-container *ngFor="let step of stepsArray; index as i">
        <div class="flex flex-col items-center text-primary relative step">
          <div
            class="rounded-full grid place-items-center h-6 w-6"
            [class]="i <= completed ? 'bg-green-500' : 'bg-gray-300'"
          >
            <ng-container *ngTemplateOutlet="step?.tpl ?? null"></ng-container>
          </div>
          <div class="text-center mt-2 text-xs font-medium uppercase">
            {{ step?.title }}
          </div>
        </div>
      </ng-container>
    </div>
  `,
  styles: [
    //language=SCSS
    `
      .step:not(:last-child) {
        &::after {
          content: '';
          width: 38%;
          height: 2px;
          @apply bg-gray-300 absolute right-0 top-3;
        }
      }

      .step:not(:first-child) {
        &::before {
          content: '';
          width: 38%;
          height: 2px;
          @apply bg-gray-300 absolute left-0 top-3;
        }
      }
    `,
  ],
})
export class StepIndicatorComponent {
  stepsArray: StepIndicatorItem[] = [];

  @Input()
  completed = 0;

  @ContentChildren(StepIndicatorItem)
  set steps(items: QueryList<StepIndicatorItem>) {
    this.stepsArray = items.toArray();
  }
}

@NgModule({
  declarations: [StepIndicatorComponent, StepIndicatorItem],
  imports: [CommonModule],
  exports: [StepIndicatorComponent, StepIndicatorItem],
})
export class StepIndicatorModule {}
