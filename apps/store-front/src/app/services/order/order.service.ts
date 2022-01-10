import { Inject, Injectable } from '@angular/core';
import { USER_DETAILS, UserDetails } from '@wfh/ui';
import { catchError, Observable, of, shareReplay, switchMap } from 'rxjs';
import { API_URL } from '@wfh/store-front/core';
import { HttpClient } from '@angular/common/http';
import { OrderRequest } from '@wfh/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    @Inject(USER_DETAILS) private readonly user$: Observable<UserDetails>,
    @Inject(API_URL) private apiUrl: string,
    private readonly http: HttpClient
  ) {}

  order(products: string[], address: any): Observable<any> {
    return this.user$.pipe(
      switchMap((user) =>
        this.http.post(`${this.apiUrl}/users/${user.id}/orders`, {
          products,
          address,
        } as OrderRequest)
      ),
      catchError(() => of([])),
      shareReplay(1)
    );
  }
}
