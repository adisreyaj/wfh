import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@wfh/store-front/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(@Inject(API_URL) private readonly apiUrl: string, private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }
}
