import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../core/tokens/api.token';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { isEmpty } from 'lodash';

export interface AutoCompleteResult {
  products: AutoCompleteData[];
  categories: AutoCompleteData[];
}

export interface AutoCompleteData {
  _id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    @Inject(API_URL) private readonly apiUrl: string,
    private readonly http: HttpClient
  ) {}

  getAutoComplete(query: string): Observable<AutoCompleteResult> {
    return forkJoin([
      this.getProductAutoComplete(query),
      this.getCategoryAutoComplete(query),
      this.getBrandAutocomplete(query),
    ]).pipe(
      map(([products, categories, brands]) => ({
        products,
        categories,
        brands,
      }))
    );
  }

  getCategoryAutoComplete(query: string): Observable<AutoCompleteData[]> {
    if (isEmpty(query)) return of([]);

    return this.http
      .get<AutoCompleteData[]>(`${this.apiUrl}/categories/autocomplete?query=${query}`)
      .pipe(this.handleErrors());
  }

  getProductAutoComplete(query: string): Observable<AutoCompleteData[]> {
    if (isEmpty(query)) return of([]);
    return this.http
      .get<AutoCompleteData[]>(`${this.apiUrl}/products/autocomplete?query=${query}`)
      .pipe(this.handleErrors());
  }

  getBrandAutocomplete(query: string): Observable<AutoCompleteData[]> {
    if (isEmpty(query)) return of([]);

    return this.http
      .get<AutoCompleteData[]>(`${this.apiUrl}/brands/autocomplete?query=${query}`)
      .pipe(this.handleErrors());
  }

  private handleErrors = <T>() => {
    return (source: Observable<T>) => source.pipe(catchError(() => of([])));
  };
}
