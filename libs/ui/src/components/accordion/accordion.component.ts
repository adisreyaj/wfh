import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { AccordionItem } from './directives/accordion-item.directive';

@Component({
  selector: 'wfh-accordion',
  template: `
    <section class="accordion">
      <div
        *ngFor="let item of items; index as i"
        [class.active]="expanded.has(i)"
        [class.disabled]="item.disabled"
        class="accordion__item"
      >
        <ng-container
          [ngTemplateOutletContext]="{
            $implicit: item,
            index: i,
            toggle: i | getToggleFunction: toggleState
          }"
          [ngTemplateOutlet]="item?.customHeader?.templateRef || defaultHeader"
        ></ng-container>
        <div
          [@contentExpansion]="expanded.has(i) ? 'expanded' : 'collapsed'"
          [class.expanded]="expanded.has(i)"
          class="accordion__content"
        >
          <ng-container *ngTemplateOutlet="item?.content?.templateRef ?? null"></ng-container>
        </div>
      </div>
    </section>

    <ng-template #defaultHeader let-index="index" let-item>
      <header (click)="item.disabled ? noOp() : toggleState(index)" class="accordion__header">
        <ng-container
          *ngTemplateOutlet="item?.customTitle?.templateRef || defaultTitle"
        ></ng-container>
        <button [disabled]="item.disabled" class="accordion__toggle-btn">
          <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
          </svg>
        </button>
      </header>
      <ng-template #defaultTitle>
        <p class="accordion__title">{{ item?.title }}</p>
      </ng-template>
    </ng-template>
  `,
  styles: [
    //language=scss
    `
      .accordion {
        &__header {
          @apply flex items-center bg-gray-50 justify-between text-sm cursor-pointer hover:bg-gray-100 p-2;
        }

        &__item.active .accordion__toggle-btn {
          transform: rotate(180deg);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('contentExpansion', [
      state('expanded', style({ height: '*', opacity: 1, visibility: 'visible' })),
      state('collapsed', style({ height: '0px', opacity: 0, visibility: 'hidden' })),
      transition('expanded <=> collapsed', animate('200ms cubic-bezier(.37,1.04,.68,.98)')),
    ]),
  ],
})
export class AccordionComponent implements AfterContentInit {
  expanded = new Set<number>();
  /**
   * Decides if the single item will be open at once or not.
   * In collapsing mode, toggling one would collapse others
   */
  @Input() collapsing = false;

  @ContentChildren(AccordionItem) items?: QueryList<AccordionItem>;

  ngAfterContentInit() {
    if (this.items) {
      this.items?.forEach((item, index) => {
        if (item.isOpen) {
          this.expanded.add(index);
        }
      });
    }
  }

  toggleState = (index: number) => {
    if (this.expanded.has(index)) {
      this.expanded.delete(index);
    } else {
      if (this.collapsing) {
        this.expanded.clear();
      }
      this.expanded.add(index);
    }
  };

  noOp() {
    return;
  }
}
