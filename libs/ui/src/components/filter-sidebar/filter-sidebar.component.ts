import { Component, NgModule } from '@angular/core';
import { AccordionModule } from '../accordion/accordion.module';
import { CheckboxModule } from '../checkbox/checkbox.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wfh-filter-sidebar',
  template: ` <wfh-accordion>
    <wfh-accordion-item title="Price Range" [isOpen]="true">
      <ng-template wfhAccordionContent>
        <div class="p-2 grid grid-cols-2 gap-4">
          <div class="form-group">
            <label>From</label>
            <div class="flex justify-start items-stretch">
              <input type="text" class="flex-1 w-full" />
            </div>
          </div>
          <div class="form-group ">
            <label>To</label>
            <div class="flex justify-start items-stretch">
              <input type="text" class="flex-1 w-full" />
            </div>
          </div>
        </div>
      </ng-template>
    </wfh-accordion-item>
    <wfh-accordion-item title="Brands">
      <ng-template wfhAccordionContent>
        <div class="p-4 flex flex-col gap-2">
          <wfh-checkbox label="Apple"></wfh-checkbox>
          <wfh-checkbox label="Samsung"></wfh-checkbox>
          <wfh-checkbox label="Sony"></wfh-checkbox>
          <wfh-checkbox label="SteelSeries"></wfh-checkbox>
        </div>
      </ng-template>
    </wfh-accordion-item>
    <wfh-accordion-item title="Rating">
      <ng-template wfhAccordionContent>
        <div class="p-4"></div>
      </ng-template>
    </wfh-accordion-item>
    <wfh-accordion-item title="Colors" [isOpen]="true">
      <ng-template wfhAccordionContent>
        <div class="p-4">
          <ul class="flex gap-4">
            <li>
              <button class="w-6 h-6 bg-primary"></button>
            </li>
            <li>
              <button class="w-6 h-6 bg-primary"></button>
            </li>
            <li>
              <button class="w-6 h-6 bg-primary"></button>
            </li>
            <li>
              <button class="w-6 h-6 bg-primary"></button>
            </li>
            <li>
              <button class="w-6 h-6 bg-primary"></button>
            </li>
          </ul>
        </div>
      </ng-template>
    </wfh-accordion-item>
    <wfh-accordion-item title="Stock">
      <ng-template wfhAccordionContent>
        <div class="p-4 flex flex-col gap-2">
          <wfh-checkbox label="In Stock"></wfh-checkbox>
          <wfh-checkbox label="Out of Stock"></wfh-checkbox>
        </div>
      </ng-template>
    </wfh-accordion-item>
  </wfh-accordion>`,
  styles: [
    `
      :host {
        @apply block w-full border border-gray-200 rounded-lg overflow-hidden;
      }
    `,
  ],
})
export class FilterSidebarComponent {}

@NgModule({
  declarations: [FilterSidebarComponent],
  imports: [CommonModule, AccordionModule, CheckboxModule],
  exports: [FilterSidebarComponent],
})
export class FilterSidebarModule {
}
