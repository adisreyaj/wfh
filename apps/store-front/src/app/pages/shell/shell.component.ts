import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderModule } from '@wfh/ui';
import { SHELL_ROUTES } from '../../app.routes';
import { AutoCompleteResult, SearchService } from './search.service';
import { Observable, Subject, switchMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { CartService } from '@wfh/store-front/service';
import { CommonModule } from '@angular/common';

@Component({
  template: `
    <wfh-header
      [suggestions]="$any(this.suggestions$ | async)"
      [cartItemsCount]="this.cartItemsCount$ | async"
      (autoComplete)="this.onAutoComplete($event)"
      (searched)="this.onSearch($event)"
      (filtered)="this.onFilter($event)"
      (logout)="this.onLogout()"
    ></wfh-header>
    <div class="mx-auto mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class ShellComponent {
  public readonly suggestions$: Observable<AutoCompleteResult>;
  public readonly autoCompleteSubject = new Subject<string>();
  readonly cartItemsCount$: Observable<number>;

  constructor(
    private readonly searchService: SearchService,
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly cartService: CartService
  ) {
    this.suggestions$ = this.autoCompleteSubject
      .asObservable()
      .pipe(switchMap((searchTerm) => this.searchService.getAutoComplete(searchTerm)));
    this.cartItemsCount$ = this.cartService.cartItemsCount$;
  }

  onSearch(searchTerm: string) {
    this.router.navigate(['/products'], { queryParams: { q: searchTerm } });
  }

  onLogout() {
    this.auth.logout({
      returnTo: window.location.origin,
    });
  }

  onAutoComplete($event: string) {
    this.autoCompleteSubject.next($event);
  }

  onFilter({ key, value }: { key: string; value: string }) {
    this.router.navigate(['/products'], {
      queryParams: {
        filters: `${key}=${value}`,
      },
      queryParamsHandling: 'merge',
    });
  }
}

@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShellComponent,
        children: SHELL_ROUTES,
      },
    ]),
    HeaderModule,
  ],
})
export class ShellModule {}
