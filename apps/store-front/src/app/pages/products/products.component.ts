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

@Component({
  selector: 'wfh-products',
  template: `
    <aside class="sticky top-6">
      <wfh-filter-sidebar></wfh-filter-sidebar>
    </aside>
    <section class="content px-6 pb-10">
      <ul class="grid grid-cols-3 gap-4">
        <li *ngFor="let product of products">
          <wfh-product-card
            [title]="product.title"
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

  products: Product[] = [
    {
      title: 'Helios Study Desk in Brown Colour',
      price: 4000,
      originalPrice: 7500,
      images: [
        'https://ii1.pepperfry.com/media/catalog/product/h/e/1100x1210/helios-study-desk-in-brown-colour-by-home-centre-helios-study-desk-in-brown-colour-by-home-centre-c1mgui.jpg',
      ],
    },
    {
      title: 'Helios Study Desk in Brown Colour',
      price: 4000,
      originalPrice: 7500,
      images: [
        'https://ii1.pepperfry.com/media/catalog/product/h/e/1100x1210/helios-study-desk-in-brown-colour-by-home-centre-helios-study-desk-in-brown-colour-by-home-centre-c1mgui.jpg',
      ],
    },
    {
      title: 'Helios Study Desk in Brown Colour',
      price: 4000,
      originalPrice: 7500,
      images: [
        'https://ii1.pepperfry.com/media/catalog/product/h/e/1100x1210/helios-study-desk-in-brown-colour-by-home-centre-helios-study-desk-in-brown-colour-by-home-centre-c1mgui.jpg',
      ],
    },
    {
      title: 'Helios Study Desk in Brown Colour',
      price: 4000,
      originalPrice: 7500,
      images: [
        'https://ii1.pepperfry.com/media/catalog/product/h/e/1100x1210/helios-study-desk-in-brown-colour-by-home-centre-helios-study-desk-in-brown-colour-by-home-centre-c1mgui.jpg',
      ],
    },
  ];

  @ViewChild(ProductQuickViewComponent) productQuickViewRef?: ProductQuickViewComponent;

  constructor(@Inject(CURRENCY_CODE) public currencyCode: string, private overlay: OverlayService) {
    overlay.clickedOutside$.subscribe(() => {
      this.productQuickViewRef?.close();
    });
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
