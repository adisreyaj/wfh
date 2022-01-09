import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserDetails {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  id: string;
  cart: string;
}

export const USER_DETAILS = new InjectionToken<Observable<UserDetails>>('User details');
