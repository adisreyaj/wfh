import { ChangeDetectorRef, Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { AccordionModule } from '../accordion/accordion.module';
import { CheckboxModule } from '../checkbox/checkbox.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { COLORS } from './filter-sidebar.data';
import { ButtonModule } from '../button/button.component';

@Component({
  selector: 'wfh-filter-sidebar',
  template: `
    <section>
      <wfh-accordion [formGroup]="filtersForm">
        <wfh-accordion-item title="Price Range" [isOpen]="true">
          <ng-template wfhAccordionContent>
            <div class="p-2 grid grid-cols-2 gap-4" formGroupName="priceRange">
              <div class="form-group">
                <label>From</label>
                <div class="flex justify-start items-stretch">
                  <input type="text" class="flex-1 w-full" formControlName="from" />
                </div>
              </div>
              <div class="form-group ">
                <label>To</label>
                <div class="flex justify-start items-stretch">
                  <input type="text" class="flex-1 w-full" formControlName="to" />
                </div>
              </div>
            </div>
          </ng-template>
        </wfh-accordion-item>
        <wfh-accordion-item title="Brands" [isOpen]="true">
          <ng-template wfhAccordionContent>
            <div class="p-4 flex flex-col gap-2">
              <ng-container *ngFor="let brand of brands">
                <wfh-checkbox
                  [label]="brand.label"
                  [value]="brand.value"
                  [checked]="this.filtersForm.get('brands')?.value?.includes(brand.value)"
                  (change)="selectBrand(brand.value)"
                ></wfh-checkbox>
              </ng-container>
            </div>
          </ng-template>
        </wfh-accordion-item>
        <wfh-accordion-item title="Categories" [isOpen]="true">
          <ng-template wfhAccordionContent>
            <div class="p-4 flex flex-col gap-2">
              <ng-container *ngFor="let category of categories">
                <wfh-checkbox
                  [label]="category.label"
                  [value]="category.value"
                  [checked]="this.filtersForm.get('categories')?.value?.includes(category.value)"
                  (change)="selectCategory(category.value)"
                ></wfh-checkbox>
              </ng-container>
            </div>
          </ng-template>
        </wfh-accordion-item>
        <wfh-accordion-item title="Rating" [isOpen]="false">
          <ng-template wfhAccordionContent>
            <div class="p-4"></div>
          </ng-template>
        </wfh-accordion-item>
        <wfh-accordion-item title="Colors" [isOpen]="true">
          <ng-template wfhAccordionContent>
            <div class="p-4 filter__colors">
              <ul class="flex gap-4 flex-wrap">
                <ng-container *ngFor="let item of COLORS">
                  <li>
                    <button
                      class="bg-gray-100 p-1 rounded-md border border-gray-100 flex items-center gap-1 text-xs"
                      [class.active]="this.filtersForm.get('colors')?.value?.includes(item.value)"
                      (click)="selectColor(item.value)"
                    >
                      <div
                        class="w-4 h-4 rounded-md color-indicator"
                        [style.background-color]="item?.color"
                      ></div>
                      <p>{{ item.label }}</p>
                    </button>
                  </li>
                </ng-container>
              </ul>
            </div>
          </ng-template>
        </wfh-accordion-item>
        <wfh-accordion-item title="Stock">
          <ng-template wfhAccordionContent>
            <div class="p-4 flex flex-col gap-2">
              <wfh-checkbox label="Out of Stock"></wfh-checkbox>
            </div>
          </ng-template>
        </wfh-accordion-item>
      </wfh-accordion>
    </section>
    <footer
      class="mt-4 flex gap-2 shadow-lg rounded-md sticky bottom-2 p-4 bg-white border border-gray-200"
    >
      <button wfh size="small" class="flex-1" (click)="triggerChange()">Apply Filters</button>
      <button wfh variant="neutral" size="small" (click)="resetFilters()">Reset</button>
    </footer>
  `,
  styles: [
    //language=SCSS
    `
      :host {
        @apply block w-full;
      }

      section {
        @apply border border-gray-200 rounded-lg overflow-hidden;
      }

      .filter {
        &__colors {
          .active {
            @apply border-primary bg-primary-100;
          }
        }
      }
    `,
  ],
})
export class FilterSidebarComponent {
  @Input()
  brands: { label: string; value: string }[] | null = [];
  @Input()
  categories: { label: string; value: string }[] | null = [];

  @Output()
  filterChanged = new EventEmitter();
  COLORS = COLORS;
  filtersForm = this.fb.group({
    priceRange: this.fb.group(
      {
        from: [],
        to: [],
      },
      {
        validators: [
          (group) => {
            const from = group.get('from')?.value;
            const to = group.get('to')?.value;
            if (from && to && from > to) {
              return {
                range: true,
              };
            }
            return null;
          },
        ],
      }
    ),
    brands: [[]],
    categories: [[]],
    rating: [[]],
    colors: [[]],
    stock: [[]],
  });

  constructor(private readonly fb: FormBuilder, private cdr: ChangeDetectorRef) {}

  @Input()
  set filters(filters: any) {
    this.filtersForm.patchValue(filters);
  }

  selectBrand(value: string) {
    const brandFormItem = this.filtersForm.get('brands');
    if (!brandFormItem) return;
    const brands = brandFormItem.value ?? [];
    const isBrandPresent = brands.includes(value);
    if (isBrandPresent) {
      brandFormItem.setValue(brands.filter((b: any) => b !== value));
    } else {
      brandFormItem.setValue([...brands, value]);
    }
  }

  selectColor(value: string) {
    const colorFormItem = this.filtersForm.get('colors');
    if (!colorFormItem) return;
    const colors = colorFormItem.value ?? [];
    const isBrandPresent = colors.includes(value);
    if (isBrandPresent) {
      colorFormItem.setValue(colors.filter((b: any) => b !== value));
    } else {
      colorFormItem.setValue([...colors, value]);
    }
  }

  triggerChange() {
    this.filterChanged.emit(this.filtersForm.value);
  }

  resetFilters() {
    this.filtersForm.reset();
    this.cdr.detectChanges();
    this.triggerChange();
  }

  selectCategory(value: string) {
    const categoryFormItem = this.filtersForm.get('categories');
    if (!categoryFormItem) return;
    const categories = categoryFormItem.value ?? [];
    const isCategoryPresent = categories.includes(value);
    if (isCategoryPresent) {
      categoryFormItem.setValue(categories.filter((b: any) => b !== value));
    } else {
      categoryFormItem.setValue([...categories, value]);
    }
  }
}

@NgModule({
  declarations: [FilterSidebarComponent],
  imports: [CommonModule, AccordionModule, CheckboxModule, ReactiveFormsModule, ButtonModule],
  exports: [FilterSidebarComponent],
})
export class FilterSidebarModule {}
