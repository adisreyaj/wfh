import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnDestroy,
  Output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconModule } from '../icon.module';
import { debounceTime, distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { SuggestionsHelperModule } from './suggestion-helpers.pipe';

@Component({
  selector: 'wfh-header',
  template: `
    <header
      class="bg-white z-10 h-20 flex justify-between items-center px-4 md:px-6 max-w-7xl mx-auto"
    >
      <div class="flex items-center gap-2">
        <img src="https://avatar.tobi.sh/tobiaslins?size=30" alt="" />
        <p class="text-gray-600 font-bold">My WFH Setup</p>
        <nav class="ml-4">
          <ul class="flex items-center gap-8">
            <ng-container *ngFor="let item of links">
              <li
                class="text-gray-500 hover:text-primary cursor-pointer transition-colors duration-200"
              >
                <a
                  [routerLink]="item.link"
                  routerLinkActive="text-primary"
                  [routerLinkActiveOptions]="{ exact: true }"
                  >{{ item.label }}</a
                >
              </li>
            </ng-container>
          </ul>
        </nav>
      </div>
      <div class="flex-1 px-6 relative">
        <div class="absolute h-full left-8 top-0 grid place-items-center">
          <rmx-icon name="search-2-line"></rmx-icon>
        </div>
        <input
          class="w-full pl-8"
          type="text"
          name="search"
          id="search"
          (keyup)="this.searchSubject.next(searchRef.value)"
          #searchRef
        />
        <ng-container *ngIf="suggestions$ | async as suggestions">
          <div class="suggestions" *ngIf="suggestions | suggestionVisible">
            <ul class="suggestions__list">
              <ng-container *ngFor="let group of suggestions | suggestionsGroup">
                <li class="suggestions__group" *ngIf="group.value.length > 0">
                  <header class="px-4 mb-2">
                    <p class="text-xs text-gray-400 font-semibold">{{ group.key | uppercase }}</p>
                  </header>
                  <ul class="px-2">
                    <li
                      tabindex="0"
                      class="suggestions__group-item"
                      *ngFor="let groupItem of group.value"
                    >
                      <p>{{ groupItem.name }}</p>
                    </li>
                  </ul>
                </li>
              </ng-container>
            </ul>
          </div>
        </ng-container>
      </div>
      <div class="flex gap-2">
        <a class="header__icon">
          <rmx-icon name="notification-4-fill"></rmx-icon>
        </a>
        <button class="header__icon" routerLink="/checkout/cart">
          <rmx-icon name="shopping-cart-2-fill"></rmx-icon>
        </button>
      </div>
    </header>
  `,
  styles: [
    // language=SCSS
    `
      .header__icon {
        @apply rounded-full hover:bg-gray-200 p-2;

        & :hover {
          .rmx-icon {
            @apply fill-primary;
          }
        }
      }

      .rmx-icon {
        width: 20px;
        height: 20px;
        @apply fill-gray-600;
      }

      .suggestions {
        @apply absolute top-12 left-0 mx-6 z-10;
        min-width: 300px;

        &__list {
          @apply bg-white shadow-xl border border-gray-200 text-sm py-4 flex flex-col gap-4;
        }

        &__group {
          &-item {
            @apply relative cursor-pointer px-4 py-2 outline-none;
            @apply hover:bg-gray-100 hover:text-primary;
            @apply focus:bg-gray-100 focus:text-primary;
            &:hover,
            &:focus {
              &:after {
                content: '';
                @apply absolute top-0 left-0 w-1 h-full bg-primary;
              }
            }

            &--selection {
              @apply absolute left-1 top-0 h-full hidden place-items-center;
            }

            &:hover {
              .suggestions__group-item--selection {
                @apply grid;
              }
            }
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
  links = [
    {
      label: 'Home',
      icon: 'home',
      link: '',
    },
    {
      label: 'Products',
      icon: 'products',
      link: 'products',
    },
    {
      label: 'About',
      icon: 'about',
      link: 'about',
    },
    {
      label: 'Contact',
      icon: 'contact',
      link: 'contact',
    },
  ];

  @Input()
  suggestions$?: Observable<Record<string, { _id: string; name: string }[]>>;

  @Output()
  searched = new EventEmitter<string>();
  searchSubject = new Subject<string>();

  private destroyed$ = new Subject<void>();

  constructor() {
    this.searchSubject
      .asObservable()
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((searchTerm) => {
        this.searched.emit(searchTerm);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, IconModule, RouterModule, SuggestionsHelperModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
