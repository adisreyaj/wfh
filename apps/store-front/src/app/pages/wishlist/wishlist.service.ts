import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@wfh/store-front/core';
import { USER_DETAILS } from '@wfh/ui';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(
    @Inject(API_URL) private readonly apiUrl: string,
    @Inject(USER_DETAILS) private readonly userDetails: any,
    private readonly http: HttpClient
  ) {}

  getWishList() {
    return this.http.get(this.wishListUrl(this.userDetails.id));
  }

  addToWishList(productId: string) {
    return this.http.post(this.wishListUrl(this.userDetails.id), { productId });
  }

  removeFromWishList(productId: string) {
    return this.http.delete(`${this.wishListUrl(this.userDetails.id)}/${productId}`);
  }

  private wishListUrl = (userId: string) => `${this.apiUrl}/users/${userId}/wishlist`;
}
