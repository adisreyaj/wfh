import { Component, NgModule } from '@angular/core';
import { AccordionModule } from '../accordion/accordion.module';

@Component({
  selector: 'wfh-filter-sidebar',
  template: ` <wfh-accordion>
    <wfh-accordion-item title="Price">
      <ng-template wfhAccordionContent>
        <div class="p-4"></div>
      </ng-template>
    </wfh-accordion-item>
    <wfh-accordion-item title="Brands">
      <ng-template wfhAccordionContent>
        <div class="p-4"></div>
      </ng-template>
    </wfh-accordion-item>
    <wfh-accordion-item title="Rating">
      <ng-template wfhAccordionContent>
        <div class="p-4"></div>
      </ng-template>
    </wfh-accordion-item>
  </wfh-accordion>`,
  styles: [
    `
      :host {
        @apply block w-full h-full;
      }
    `,
  ],
})
export class FilterSidebarComponent {}

@NgModule({
  declarations: [FilterSidebarComponent],
  imports: [AccordionModule],
  exports: [FilterSidebarComponent],
})
export class FilterSidebarModule {}
