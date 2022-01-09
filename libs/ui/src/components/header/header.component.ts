import { CommonModule, DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  NgModule,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { TippyModule } from '@ngneat/helipopper';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';
import { IconModule } from '../icon.module';
import { SuggestionsHelperModule } from './suggestion-helpers.pipe';
import { USER_DETAILS, UserDetails } from './user-details.token';
import { ButtonModule } from '../button/button.component';

@Component({
  selector: 'wfh-header',
  template: `
    <header
      class="bg-white z-10 h-20 flex justify-between items-center max-w-screen-2xl px-4 md:px-6 mx-auto"
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
          (keyup)="this.autoCompleteSubject.next(searchRef.value)"
          (keyup.enter)="this.searched.emit(searchRef.value)"
          (focus)="this.suggestionsVisibleSubject.next(true)"
          #searchRef
        />
        <ng-container *ngIf="suggestionsContent$ | async as suggestions">
          <div id="suggestions" class="suggestions" *ngIf="suggestions | suggestionVisible">
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
                      (click)="suggestionsClicked(group.key, groupItem)"
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
        <a class="header__icon" tippy="Notifications">
          <rmx-icon name="notification-4-fill"></rmx-icon>
        </a>
        <a class="header__icon" routerLink="/wishlist">
          <rmx-icon name="heart-3-fill"></rmx-icon>
        </a>
        <button class="header__icon relative" routerLink="/checkout/cart">
          <rmx-icon name="shopping-cart-2-fill"></rmx-icon>
          <div
            *ngIf="cartItemsCount !== null"
            class="absolute -top-1 h-4 w-4 grid place-items-center -right-1 text-xs bg-primary rounded-md text-white"
          >
            {{ cartItemsCount }}
          </div>
        </button>
      </div>
      <ng-container *ngIf="user$ | async as user">
        <div
          class="flex items-center ml-4 gap-2 outline-none"
          *ngIf="user?.email; else signIn"
          [tippy]="profile"
          variation="menu"
          [offset]="[-20, 10]"
        >
          <img
            class="rounded-full w-10 h-10 cursor-pointer"
            [src]="user?.avatar"
            [alt]="user?.firstName"
          />
          <div class="text-xs text-gray-500">
            <p class="font-semibold">{{ user.firstName }}</p>
            <p class="text-gray-400">{{ user.lastName }}</p>
          </div>
        </div>
      </ng-container>

      <ng-template #signIn>
        <div class="ml-4">
          <button wfh (click)="auth.loginWithPopup()">Login</button>
        </div>
      </ng-template>

      <ng-template #profile>
        <div [style.min-width.px]="200">
          <a class="dropdown-item" routerLink="/profile">Profile</a>
          <button class="dropdown-item w-full" (click)="logout.emit()">Logout</button>
        </div>
      </ng-template>
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
    // {
    //   label: 'Categories',
    //   icon: 'categories',
    //   link: 'categories',
    // },
    // {
    //   label: 'Bundles',
    //   icon: 'bundles',
    //   link: 'bundles',
    // },
  ];
  @Input()
  cartItemsCount: number | null = null;
  @Output()
  autoComplete = new EventEmitter<string>();
  autoCompleteSubject = new Subject<string>();
  @Output()
  searched = new EventEmitter<string>();
  searchSubject = new Subject<string>();
  @Output()
  logout = new EventEmitter<void>();

  @Output()
  filtered = new EventEmitter<{ key: string; value: string }>();
  @ViewChild('searchRef') searchRef: ElementRef<HTMLInputElement> | null = null;
  suggestionsVisibleSubject = new BehaviorSubject(false);
  private destroyed$ = new Subject<void>();
  private suggestionSubject = new BehaviorSubject<any>([]);
  readonly suggestionsContent$: Observable<any> = combineLatest([
    this.suggestionSubject.asObservable(),
    this.suggestionsVisibleSubject.asObservable(),
  ]).pipe(map(([suggestions, visible]) => (visible ? suggestions : {})));

  constructor(
    public readonly auth: AuthService,
    @Inject(USER_DETAILS) public readonly user$: Observable<UserDetails>,
    private readonly router: Router,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    this.autoCompleteSubject
      .asObservable()
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroyed$))
      .subscribe((searchTerm) => {
        this.autoComplete.emit(searchTerm);
      });
  }

  @Input()
  set suggestions(data: Record<string, { _id: string; name: string }[]>) {
    this.suggestionSubject.next(data ?? {});
    this.suggestionsVisibleSubject.next(true);
  }

  @HostListener('window:click', ['$event'])
  onClick(event: MouseEvent) {
    const autoComplete = this.document.getElementById('suggestions');
    if (
      autoComplete &&
      !autoComplete.contains(event.target as Node) &&
      !this.searchRef?.nativeElement.contains(event.target as Node)
    ) {
      this.suggestionsVisibleSubject.next(false);
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  suggestionsClicked(group: string, item: any) {
    switch (group) {
      case 'products':
        this.searched.emit(item.name);
        break;
      case 'brands':
      case 'categories':
        this.filtered.emit({ key: group, value: item._id });
        break;
    }
    this.suggestionsVisibleSubject.next(false);
  }
}

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    IconModule,
    RouterModule,
    SuggestionsHelperModule,
    TippyModule,
    ButtonModule,
  ],
  exports: [HeaderComponent],
})
export class HeaderModule {}
