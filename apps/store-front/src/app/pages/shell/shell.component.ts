import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderModule } from '@wfh/ui';
import { SHELL_ROUTES } from '../../app.routes';
import { AutoCompleteResult, SearchService } from './search.service';
import { Observable, Subject, switchMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  template: `
    <wfh-header
      (autoComplete)="this.onAutoComplete($event)"
      (searched)="this.onSearch($event)"
      (logout)="this.onLogout()"
      [suggestions$]="$any(suggestions$)"
    ></wfh-header>
    <div class="container mx-auto mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class ShellComponent {
  public readonly suggestions$: Observable<AutoCompleteResult>;
  public autoCompleteSubject = new Subject<string>();

  constructor(
    private searchService: SearchService,
    private auth: AuthService,
    private router: Router
  ) {
    this.suggestions$ = this.autoCompleteSubject
      .asObservable()
      .pipe(switchMap((searchTerm) => this.searchService.getAutoComplete(searchTerm)));
  }

  onSearch(searchTerm: string) {
    this.router.navigate(['/products'], { queryParams: { q: searchTerm } });
  }

  onLogout() {
    this.auth.logout();
  }

  onAutoComplete($event: string) {
    this.autoCompleteSubject.next($event);
  }
}

@NgModule({
  declarations: [ShellComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: ShellComponent, children: SHELL_ROUTES }]),
    HeaderModule,
  ],
})
export class ShellModule {}
