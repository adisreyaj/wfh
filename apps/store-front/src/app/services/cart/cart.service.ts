import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemsMap: Map<string, unknown> = new Map();

  readonly cartItems$ = new BehaviorSubject<unknown[]>([]);
  readonly cartItemsCount$ = this.cartItems$.pipe(map((items) => items.length));

  constructor() {
    const cartItemsInStorage = localStorage.getItem('cart');
    if (cartItemsInStorage) {
      this.cartItemsMap = this.mapify(JSON.parse(cartItemsInStorage));
      this.updateObservable(false);
    }
  }

  add(item: any) {
    const isItemInCart: any = this.cartItemsMap.has(item._id);
    if (isItemInCart) {
      this.cartItemsMap.set(item._id, { ...isItemInCart, count: isItemInCart.count + 1 });
    } else {
      this.cartItemsMap.set(item._id, { ...item, count: 1 });
    }
    this.updateObservable();
  }

  remove(item: any) {
    const isItemInCart: any = this.cartItemsMap.has(item._id);
    if (isItemInCart && isItemInCart.count > 1) {
      this.cartItemsMap.set(item._id, { ...isItemInCart, count: isItemInCart.count - 1 });
    } else if (isItemInCart && isItemInCart.count === 1) {
      this.cartItemsMap.delete(item._id);
    }
    this.updateObservable();
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
