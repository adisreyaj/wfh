import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterSidebarModule } from '@wfh/ui';

@Component({
  selector: 'wfh-products',
  template: `
    <aside class="w-72">
      <wfh-filter-sidebar></wfh-filter-sidebar>
    </aside>
    <section></section>
  `,
  styles: [
    `
      :host {
        @apply block mx-auto max-w-7xl;
      }
    `,
  ],
})
export class ProductsPage {}

@NgModule({
  declarations: [ProductsPage],
  imports: [RouterModule.forChild([{ path: '', component: ProductsPage }]), FilterSidebarModule],
})
export class ProductsModule {}
