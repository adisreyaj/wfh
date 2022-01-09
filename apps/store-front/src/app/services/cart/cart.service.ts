import { Inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  shareReplay,
  switchMap,
  take,
} from 'rxjs';
import { USER_DETAILS, UserDetails } from '@wfh/ui';
import { API_URL } from '@wfh/store-front/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemsMap: Map<string, { id: string; quantity: number }> = new Map();

  readonly cartItems$ = new BehaviorSubject<unknown[]>([]);
  readonly cartItemsCount$ = this.cartItems$.pipe(map((items) => items.length));

  readonly userId$: Observable<string>;
  readonly cartId$: Observable<string>;

  constructor(
    @Inject(USER_DETAILS) private readonly user$: Observable<UserDetails>,
    @Inject(API_URL) private apiUrl: string,
    private readonly http: HttpClient
  ) {
    this.userId$ = this.user$.pipe(map((user) => user.id));
    this.cartId$ = this.user$.pipe(map((user) => user.cart));
    const cartItemsInStorage = localStorage.getItem('cart');
    if (cartItemsInStorage) {
      this.cartItemsMap = this.mapify(JSON.parse(cartItemsInStorage));
      this.updateObservable(false);
    }
  }

  getCart() {
    return combineLatest([this.userId$, this.cartId$]).pipe(
      take(1),
      switchMap(([userId, cartId]) => {
        return this.http.get(`${this.apiUrl}/users/${userId}/cart/${cartId}`);
      }),
      shareReplay(1)
    );
  }

  add(item: any) {
    const isItemInCart: any = this.cartItemsMap.has(item._id);
    if (isItemInCart) {
      const itemInCart: any = this.cartItemsMap.get(item._id);
      this.cartItemsMap.set(item._id, { ...itemInCart, quantity: itemInCart.quantity + 1 });
    } else {
      this.cartItemsMap.set(item._id, { ...item, quantity: 1 });
    }
    this.updateObservable();

    return this.userId$.pipe(
      switchMap((userId) =>
        this.http.put(`${this.apiUrl}/users/${userId}/cart`, { id: item._id, quantity: 1 })
      )
    );
  }

  remove(item: any) {
    const isItemInCart: any = this.cartItemsMap.has(item._id);
    if (isItemInCart && isItemInCart.quantity > 1) {
      this.cartItemsMap.set(item._id, { ...isItemInCart, quantity: isItemInCart.quantity - 1 });
    } else if (isItemInCart && isItemInCart.quantity === 1) {
      this.cartItemsMap.delete(item._id);
    }
    this.updateObservable();
    return this.userId$.pipe(
      switchMap((userId) => this.http.delete(`${this.apiUrl}/users/${userId}/cart/${item._id}`))
    );
  }

  updateObservable(cache = true) {
    this.cartItems$.next([...this.cartItemsMap.values()]);
    if (cache) {
      const itemsToSave = this.objectify(this.cartItemsMap);
      localStorage.setItem('cart', JSON.stringify(itemsToSave));
    }
  }

  private objectify(map: Map<string, unknown>): any {
    let obj = Object.create(null);
    for (let [k, v] of map) {
      obj[k] = v;
    }
    return obj;
  }

  private mapify(obj: Record<any, any>) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }
}
