import { Component, Inject, NgModule, OnInit, ViewChild } from '@angular/core';
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
import {
  Product,
  ProductPromise,
  ProductQuickView,
  ProductSpecification,
} from './products.interface';
import { ProductsService } from './services/products.service';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  ReplaySubject,
  startWith,
  switchMap,
  take,
} from 'rxjs';
import { WishlistService } from '../wishlist/wishlist.service';
import { SPECIFICATION_KEYS } from './products.config';

@Component({
  selector: 'wfh-products',
  template: `
    <aside class="sticky top-6">
      <wfh-filter-sidebar
        [brands]="brands$ | async"
        (filterChanged)="applyFilter($event)"
      ></wfh-filter-sidebar>
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
            (addToWishlist)="addToWishlist(product)"
          ></wfh-product-card>
        </li>
      </ul>
    </section>
    <wfh-product-quick-view [product]="activeProduct$ | async"></wfh-product-quick-view>
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
export class ProductsPage implements OnInit {
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
  readonly brands$: Observable<any[]>;
  filters: any = null;
  private readonly getProductsTrigger = new BehaviorSubject<any>(null);
  private readonly activeProductSubject = new ReplaySubject<Product>();
  readonly activeProduct$: Observable<ProductQuickView> = this.activeProductSubject
    .asObservable()
    .pipe(
      filter((product) => !!product),
      map((product) => {
        const specificationKeys = SPECIFICATION_KEYS[product.kind];
        const specifications = specificationKeys.map(({ key, label }) => {
          return {
            label: label,
            // @ts-ignore
            value: product[key],
          };
        });
        return {
          ...product,
          promises: this.promises,
          specifications: specifications,
        };
      })
    );

  constructor(
    @Inject(CURRENCY_CODE) public currencyCode: string,
    private overlay: OverlayService,
    private productService: ProductsService,
    private wishlistService: WishlistService
  ) {
    overlay.clickedOutside$.subscribe(() => {
      this.productQuickViewRef?.close();
    });
    this.products$ = this.getProductsTrigger.asObservable().pipe(
      switchMap((filters) => productService.getAllProducts(filters)),
      startWith([])
    );
    this.brands$ = productService.getAllBrands().pipe(
      map((brands) =>
        brands.map((brand) => ({
          label: brand.name,
          value: brand._id,
        }))
      )
    );
  }

  ngOnInit() {
    this.getProductsTrigger.next(this.filters);
  }

  openQuickView(product: Product) {
    this.activeProductSubject.next(product);
    this.productQuickViewRef?.open();
  }

  addToWishlist(product: string) {
    this.wishlistService.addToWishList(product).pipe(take(1)).subscribe();
  }

  removeFromWishlist(product: string) {
    this.wishlistService.removeFromWishList(product).pipe(take(1)).subscribe();
  }

  applyFilter(filters: any) {
    this.filters = filters;
    this.getProductsTrigger.next(filters);
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
