import { Component, Inject, NgModule, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  catchError,
  combineLatest,
  filter,
  map,
  Observable,
  of,
  ReplaySubject,
  startWith,
  Subject,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { WishlistService } from '../wishlist/wishlist.service';
import { SPECIFICATION_KEYS } from './products.config';
import { isEmpty } from 'lodash';
import { CartService, LoaderService } from '@wfh/store-front/service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'wfh-products',
  template: `
    <header class="mb-4">
      <h1 class="text-2xl font-semibold">Products</h1>
      <ng-container *ngIf="searchQuery$ | async as searchQuery; else defaultSubtitle">
        <p class="text-gray-500">
          Searching for <strong>{{ searchQuery }}</strong>
          <span class="ml-2"
            ><button (click)="clearSearch()" wfh size="xsmall" variant="neutral">
              Clear Search
            </button></span
          >
        </p>
      </ng-container>

      <ng-template #defaultSubtitle>
        <p class="text-gray-500">
          Showing all available products. Use the filters to narrow down the results!
        </p>
      </ng-template>
    </header>
    <section class="content flex">
      <aside class="sticky top-6">
        <wfh-filter-sidebar
          [filters]="filters$ | async"
          [brands]="brands$ | async"
          [categories]="categories$ | async"
          (filterChanged)="applyFilter($event)"
        ></wfh-filter-sidebar>
      </aside>
      <section class="content px-6 pb-10">
        <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <li *ngFor="let product of products$ | async">
            <wfh-product-card
              [class.active]="(searchQuery$ | async) === product.name"
              [title]="product.name"
              [price]="product.price"
              [originalPrice]="product.originalPrice"
              [images]="product.images"
              (quickView)="openQuickView(product)"
              (addToWishlist)="addToWishlist(product)"
              (addToCart)="addToCart(product)"
            ></wfh-product-card>
          </li>
        </ul>
      </section>
    </section>
    <wfh-product-quick-view
      [product]="activeProduct$ | async"
      (addToCart)="addToCart($event)"
    ></wfh-product-quick-view>
  `,
  styles: [
    //language=SCSS
    `
      :host {
        @apply block mx-auto max-w-screen-2xl px-4 md:px-6;
        aside {
          width: 280px;
        }

        .content {
          @apply flex-1;
        }

        wfh-product-card.active {
          @apply ring-2 ring-primary shadow-lg;
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
  @ViewChild(ProductQuickViewComponent, { static: true })
  productQuickViewRef?: ProductQuickViewComponent;

  readonly products$: Observable<any[]>;
  readonly brands$: Observable<any[]>;
  readonly categories$: Observable<any[]>;

  filters: any = null;
  filtersSubject: Subject<any> = new ReplaySubject();
  filters$: Observable<any> = this.filtersSubject.asObservable();
  readonly filterQuery$ = this.activatedRoute.queryParams.pipe(
    map((params) => params.filters),
    tap(() => {
      const filtersFormatted = this.parseQueryParams();
      this.updateFilters(filtersFormatted);
    })
  );
  readonly searchQuery$ = this.activatedRoute.queryParams.pipe(map((params) => params?.q));
  private readonly getProductsTrigger = new Subject<void>();
  private readonly activeProductSubject = new Subject<Product>();
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
    private wishlistService: WishlistService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private toast: HotToastService,
    private loader: LoaderService
  ) {
    overlay.clickedOutside$.subscribe(() => {
      this.productQuickViewRef?.close();
    });
    this.products$ = combineLatest([
      this.getProductsTrigger.asObservable().pipe(startWith(true)),
      this.searchQuery$,
      this.filterQuery$,
    ]).pipe(
      map(([, term]) => term),
      tap(() => {
        this.loader.show();
      }),
      switchMap((query: string) =>
        isEmpty(query)
          ? this.productService.getAllProducts(this.filters)
          : this.productService.getProductsSearch(query, this.filters)
      ),
      tap(() => {
        this.loader.hide();
      }),
      startWith([]),
      catchError(() => {
        this.loader.hide();
        return of([]);
      })
    );
    this.brands$ = productService.getAllBrands().pipe(
      map((brands) =>
        brands.map((brand) => ({
          label: brand.name,
          value: brand._id,
        }))
      )
    );
    this.categories$ = productService.getAllCategories().pipe(
      map((categories) =>
        categories.map((category) => ({
          label: category.name,
          value: category._id,
        }))
      )
    );
  }

  ngOnInit() {
    const filtersFormatted = this.parseQueryParams();
    this.updateFilters(filtersFormatted);
    this.getProductsTrigger.next();
  }

  openQuickView(product: Product) {
    this.productQuickViewRef?.open();
    this.activeProductSubject.next(product);
  }

  addToWishlist(product: string) {
    this.wishlistService.addToWishList(product).pipe(take(1)).subscribe();
  }

  removeFromWishlist(product: string) {
    this.wishlistService.removeFromWishList(product).pipe(take(1)).subscribe();
  }

  applyFilter(filters: any) {
    this.updateFilters(filters);
    const query = this.contsructFiltersQuery(this.filters);
    if (!isEmpty(query)) {
      this.router.navigate(['/products'], {
        queryParams: { filters: query },
        queryParamsHandling: 'merge',
      });
    } else {
      const search = this.activatedRoute.snapshot.queryParams.q ?? null;
      this.router.navigate(['/products'], {
        queryParams: { q: search },
      });
    }
    this.getProductsTrigger.next();
  }

  updateFilters(filters: unknown) {
    this.filters = filters;
    this.filtersSubject.next(this.filters);
  }

  clearSearch() {
    const query = this.contsructFiltersQuery(this.filters);
    if (!isEmpty(query)) {
      this.router.navigate(['/products'], {
        queryParams: { filters: query },
      });
    } else {
      this.router.navigate(['/products']);
    }
  }

  addToCart(product: any) {
    this.cartService.add(product);
    this.toast.success(`${product.name} Added to cart!`);
  }

  private parseQueryParams() {
    const filtersApplied: string[] =
      this.activatedRoute.snapshot.queryParams?.filters?.split('&') ?? [];
    const filters: Record<string, string[] | string> = filtersApplied.reduce((acc, curr) => {
      const [key, value] = curr.split('=');
      return { ...acc, [key]: value.split(',') };
    }, {});
    const { price_from, price_to, ...others } = filters;
    let filtersFormatted: Record<string, any> = { ...others };
    if (price_from) {
      if (!filtersFormatted?.priceRange) filtersFormatted = { ...filtersFormatted, priceRange: {} };
      filtersFormatted['priceRange'].from = +price_from[0];
    }
    if (price_to) {
      if (!filtersFormatted?.priceRange) filtersFormatted = { ...filtersFormatted, priceRange: {} };
      filtersFormatted['priceRange'].to = +price_to[0];
    }
    return filtersFormatted;
  }

  private contsructFiltersQuery(filters: any) {
    if (!filters) return null;
    const { priceRange, brands, colors, rating, stock, categories } = filters;
    const query = [];

    if (priceRange?.from) {
      query.push(`price_from=${priceRange.from}`);
    }
    if (priceRange?.to) {
      query.push(`price_to=${priceRange.to}`);
    }
    if (brands?.length > 0) {
      query.push(`brands=${brands.join(',')}`);
    }
    if (categories?.length > 0) {
      query.push(`categories=${categories.join(',')}`);
    }
    if (rating?.length > 0) {
      query.push(`rating=${rating.join(',')}`);
    }
    if (colors?.length > 0) {
      query.push(`colors=${colors.join(',')}`);
    }
    if (stock?.length > 0) {
      query.push(`stock=${stock.join(',')}`);
    }

    return query.join('&');
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
