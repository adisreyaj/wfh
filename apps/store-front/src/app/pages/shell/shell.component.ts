import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '@wfh/ui';
import { SHELL_ROUTES } from '../../app.routes';
import { AutoCompleteResult, SearchService } from './search.service';
import { Observable, Subject, switchMap } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  template: `
    <wfh-header
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
  public searched = new Subject<string>();

  constructor(private searchService: SearchService, private auth: AuthService) {
    this.suggestions$ = this.searched
      .asObservable()
      .pipe(switchMap((searchTerm) => this.searchService.getAutoComplete(searchTerm)));
  }

  onSearch(searchTerm: string) {
    this.searched.next(searchTerm);
  }

  onLogout() {
    this.auth.logout();
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
