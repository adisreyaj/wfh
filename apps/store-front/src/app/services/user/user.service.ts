import { Inject, Injectable } from '@angular/core';
import { USER_DETAILS, UserDetails } from '@wfh/ui';
import { catchError, Observable, of, shareReplay, switchMap } from 'rxjs';
import { API_URL } from '@wfh/store-front/core';
import { HttpClient } from '@angular/common/http';

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
      switchMap((user) => this.http.get(`${this.apiUrl}/users/${user.id}/address`)),
      catchError(() => of([])),
      shareReplay(1)
    );
  }
}
