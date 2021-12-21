import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../core/tokens/api.token';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, Observable, of } from 'rxjs';

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
  constructor(@Inject(API_URL) private apiUrl: string, private readonly http: HttpClient) {}

  getAutoComplete(query: string): Observable<AutoCompleteResult> {
    return forkJoin({
      products: this.getProductAutoComplete(query),
      categories: this.getCategoryAutoComplete(query),
      brands: this.getBrandAutocomplete(query),
    }).pipe();
  }

  getCategoryAutoComplete(query: string): Observable<AutoCompleteData[]> {
    return this.http
      .get<AutoCompleteData[]>(`${this.apiUrl}/categories/autocomplete?query=${query}`)
      .pipe(this.handleErrors());
  }

  getProductAutoComplete(query: string): Observable<AutoCompleteData[]> {
    return this.http
      .get<AutoCompleteData[]>(`${this.apiUrl}/products/autocomplete?query=${query}`)
      .pipe(this.handleErrors());
  }

  getBrandAutocomplete(query: string): Observable<AutoCompleteData[]> {
    return this.http
      .get<AutoCompleteData[]>(`${this.apiUrl}/brands/autocomplete?query=${query}`)
      .pipe(this.handleErrors());
  }

  private handleErrors = <T>() => {
    return (source: Observable<T>) => source.pipe(catchError(() => of([])));
  };
}
