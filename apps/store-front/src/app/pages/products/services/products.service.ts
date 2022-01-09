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
    console.log({ filterQuery });
    return this.http.get<any[]>(`${this.apiUrl}/products`, {
      params: filterQuery ?? '',
    });
  }

  getProductsSearch(searchTerm: string, filters: unknown) {
    const filterQuery = this.contsructFiltersQuery(filters);
    const params = {
      query: searchTerm,
      ...(filterQuery ?? {}),
    };

    return this.http.get<unknown[]>(`${this.apiUrl}/search`, { params });
  }

  getAllBrands() {
    return this.http.get<any[]>(`${this.apiUrl}/brands`);
  }

  getAllCategories() {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  private contsructFiltersQuery(filters: any) {
    if (!filters) return null;
    const { priceRange, brands, colors, ratings, stock, categories } = filters;
    let query = {};

    if (priceRange?.from) {
      query = { ...query, price_from: priceRange.from };
    }
    if (priceRange?.to) {
      query = { ...query, price_to: priceRange.to };
    }
    if (brands?.length > 0) {
      query = { ...query, brands: brands.join(',') };
    }
    if (categories?.length > 0) {
      query = { ...query, categories: categories.join(',') };
    }
    if (ratings?.length > 0) {
      query = { ...query, rating: ratings.join(',') };
    }
    if (colors?.length > 0) {
      query = { ...query, colors: colors.join(',') };
    }
    if (stock?.length > 0) {
      query = { ...query, stock };
    }

    return query;
  }
}
