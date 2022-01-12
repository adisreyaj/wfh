import { Inject, Injectable } from '@angular/core';
import { USER_DETAILS, UserDetails } from '@wfh/ui';
import { catchError, Observable, of, shareReplay, switchMap, take } from 'rxjs';
import { API_URL } from '@wfh/store-front/core';
import { HttpClient } from '@angular/common/http';
import { AddressRequest } from '@wfh/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    @Inject(USER_DETAILS) private readonly user$: Observable<UserDetails>,
    @Inject(API_URL) private apiUrl: string,
    private readonly http: HttpClient
  ) {}

  getAddresses(): Observable<any> {
    return this.user$.pipe(
      take(1),
      switchMap((user) => this.http.get(`${this.apiUrl}/users/${user.id}/address`)),
      catchError(() => of([])),
      shareReplay(1)
    );
  }

  addAddress(address: AddressRequest) {
    return this.user$.pipe(
      take(1),
      switchMap((user) => this.http.post(`${this.apiUrl}/users/${user.id}/address`, address)),
      catchError(() => of([])),
      shareReplay(1)
    );
  }

  updatedAddress(id: string, address: AddressRequest) {
    return this.user$.pipe(
      take(1),
      switchMap((user) => this.http.put(`${this.apiUrl}/users/${user.id}/address/${id}`, address)),
      catchError(() => of([])),
      shareReplay(1)
    );
  }

  deleteAddress(id: string) {
    return this.user$.pipe(
      take(1),
      switchMap((user) => this.http.delete(`${this.apiUrl}/users/${user.id}/address/${id}`)),
      catchError(() => of([])),
      shareReplay(1)
    );
  }
}
