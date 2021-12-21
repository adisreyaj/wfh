import { Component, Inject, NgModule, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ButtonModule,
  CURRENCY_CODE,
  FilterSidebarModule,
  OverlayService,
  ProductCardModule,
  SideSheetModule,
} from '@wfh/ui';
import { IconModule } from '../../shared/modules/icon.module';
import { CommonModule } from '@angular/common';
import { ProductQuickViewComponent } from './product-quick-view/product-quick-view.component';
import { Product, ProductPromise, ProductSpecification } from './products.interface';
import { ProductsService } from './services/products.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'wfh-products',
  template: `
    <aside class="sticky top-6">
      <wfh-filter-sidebar></wfh-filter-sidebar>
    </aside>
    <section class="content px-6 pb-10">
      <ul class="grid grid-cols-3 gap-4">
        <li *ngFor="let product of products$ | async">
          <wfh-product-card
            [title]="product.name"
            [price]="product.price"
            [originalPrice]="product.originalPrice"
            [images]="product.images"
            (quickView)="openQuickView(product)"
          ></wfh-product-card>
        </li>
      </ul>
    </section>
    <wfh-product-quick-view
      [promises]="promises"
      [specifications]="specifications"
    ></wfh-product-quick-view>
  `,
  styles: [
    //language=SCSS
    `
      :host {
        @apply flex mx-auto max-w-7xl px-4 items-start;
        aside {
          width: 280px;
        }

        .content {
          @apply flex-1;
        }
      }
    `,
  ],
})
export class ProductsPage {
  promises: ProductPromise[] = [
    {
      label: '12m warranty',
      img: 'warranty.png',
    },
    {
      label: 'Easy Returns',
      img: 'easy-returns.png',
    },
    {
      label: 'Safe Delivery',
      img: 'safe-delivery.png',
    },
    {
      label: 'Free Installation',
      img: 'installation.png',
    },
  ];

  specifications: ProductSpecification[] = [
    {
      label: 'Dimensions',
      value: '10 x 20 x 4 cm',
    },
    {
      label: 'Weight',
      value: '10 kg',
    },
    {
      label: 'Brand',
      value: 'Home Centre',
    },
    {
      label: 'Model',
      value: 'Helios Elite',
    },
    {
      label: 'Warranty',
      value: '1 year',
    },
    {
      label: 'Color',
      value: 'Brown',
    },
  ];
  @ViewChild(ProductQuickViewComponent) productQuickViewRef?: ProductQuickViewComponent;
  readonly products$: Observable<any[]>;

  constructor(
    @Inject(CURRENCY_CODE) public currencyCode: string,
    private overlay: OverlayService,
    private productService: ProductsService
  ) {
    overlay.clickedOutside$.subscribe(() => {
      this.productQuickViewRef?.close();
    });
    this.products$ = productService.getAllProducts();
  }

  openQuickView(product: Product) {
    this.productQuickViewRef?.open();
  }
}

@NgModule({
  declarations: [ProductsPage, ProductQuickViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProductsPage }]),
    FilterSidebarModule,
    ProductCardModule,
    IconModule,
    ButtonModule,
    SideSheetModule,
  ],
})
export class ProductsModule {}
