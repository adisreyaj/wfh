import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconModule } from '../icon.module';

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
        <input class="w-full pl-8" type="search" name="" id="" />
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
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
}

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, IconModule, RouterModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
