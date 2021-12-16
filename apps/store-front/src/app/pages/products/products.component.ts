import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterSidebarModule } from '@wfh/ui';

@Component({
  selector: 'wfh-products',
  template: ``,
})
export class ProductsPage {}

@NgModule({
  declarations: [ProductsPage],
  imports: [RouterModule.forChild([{ path: '', component: ProductsPage }]), FilterSidebarModule],
})
export class ProductsModule {}
