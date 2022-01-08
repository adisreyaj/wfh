import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@wfh/store-front/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(@Inject(API_URL) private readonly apiUrl: string, private http: HttpClient) {}

  getAllProducts(filters: any) {
    const filterQuery = this.contsructFiltersQuery(filters);
    let url = `${this.apiUrl}/products`;
    if (filterQuery) url += `?${filterQuery}`;
    return this.http.get<any[]>(url);
  }

  getAllBrands() {
    return this.http.get<any[]>(`${this.apiUrl}/brands`);
  }

  private contsructFiltersQuery(filters: any) {
    if (!filters) return null;
    const { priceRange, brands, colors, rating, stock } = filters;
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
