import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '@wfh/ui';
import { SHELL_ROUTES } from '../../app.routes';
import { AutoCompleteResult, SearchService } from './search.service';
import { Observable, startWith, Subject, switchMap } from 'rxjs';

@Component({
  template: `
    <wfh-header (searched)="onSearch($event)" [suggestions$]="$any(suggestions$)"></wfh-header>
    <div class="container mx-auto mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class ShellComponent {
  public readonly suggestions$: Observable<AutoCompleteResult>;
  public searched = new Subject<string>();

  constructor(private searchService: SearchService) {
    this.suggestions$ = this.searched.asObservable().pipe(
      switchMap((searchTerm) => this.searchService.getAutoComplete(searchTerm)),
      startWith({
        products: [
          {
            _id: '61bf67b36def0db85bc4dd4f',
            name: 'Razer Huntsman Elite',
          },
          {
            _id: '61bf6abdde8f6deae35c7168',
            name: 'Razer Huntsman',
          },
        ],
        categories: [
          {
            _id: '61bf67b36def0db85bc4dd4f',
            name: 'Mouse',
          },
          {
            _id: '61bf6abdde8f6deae35c7168',
            name: 'Keyboard',
          },
        ],
      })
    );
  }

  onSearch(searchTerm: string) {
    this.searched.next(searchTerm);
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
