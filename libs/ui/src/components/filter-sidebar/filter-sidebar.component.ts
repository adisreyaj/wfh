import { Component, NgModule } from '@angular/core';
import { AccordionModule } from '../accordion/accordion.module';

@Component({
  selector: 'wfh-filter-sidebar',
  template: ` <wfh-accordion>
    <wfh-accordion-item title="Price" [isOpen]="true">
      <ng-template wfhAccordionContent>
        <div class="p-2 grid grid-cols-2 gap-4">
          <div class="form-group">
            <label>From</label>
            <div class="flex justify-start items-stretch">
              <div class="grid place-items-center w-8 border border-gray-200 bg-gray-100">
                <p class="">$</p>
              </div>
              <input type="text" class="flex-1 w-full" />
            </div>
          </div>
          <div class="form-group ">
            <label>To</label>
            <div class="flex justify-start items-stretch">
              <div class="grid place-items-center w-8 border border-gray-200 bg-gray-100">
                <p class="">$</p>
              </div>
              <input type="text" class="flex-1 w-full" />
            </div>
          </div>
        </div>
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
        @apply block w-full h-full border border-gray-100;
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
