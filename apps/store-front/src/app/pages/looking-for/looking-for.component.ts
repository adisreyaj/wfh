import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '@wfh/ui';

@Component({
  selector: 'wfh-looking-for',
  template: `
    <main class="w-screen h-screen grid place-items-center">
      <section class="max-w-4xl">
        <header>
          <h1 class="text-2xl font-bold">What are you looking for?</h1>
          <p class="text-gray-600">Choose what all do you need us to find for you.</p>
        </header>
        <ul class="grid grid-cols-5 gap-4 my-10">
          <ng-container *ngFor="let category of categories; index as i">
            <li
              class="relative border border-gray-300 hover:border-primary cursor-pointer hover:shadow-xl bg-white p-4"
              (click)="onSelect(i)"
              [class.selected]="selected.has(category.id)"
            >
              <ng-container *ngIf="selected.has(category.id)">
                <rmx-icon name="checkbox-circle-fill" class="absolute top-1 right-1 selected-icon"></rmx-icon>
              </ng-container>
              <header>
                <img [src]="category.image" [alt]="category.name" />
                <h2 class="text-lg font-semibold">{{ category.name }}</h2>
              </header>
              <div></div>
            </li>
          </ng-container>
        </ul>
        <footer class="flex justify-end items-center">
          <button (click)="proceed()" [variant]="selected.size === 0 ? 'neutral' : 'primary'">
            {{ selected.size === 0 ? 'Skip for Now' : 'Proceed' }}
          </button>
        </footer>
      </section>
    </main>
  `,
  styles: [
    `
      .selected {
        @apply shadow-2xl;
      }
      .selected-icon {
        @apply fill-green-500;
      }
    `,
  ],
})
export class LookingForPage {
  categories = [
    {
      id: 'monitor',
      name: 'Monitor',
      image:
        'https://www.ikea.com/in/en/images/products/bekant-desk-black-stained-ash-veneer-black__0736390_pe740519_s5.jpg?f=xl',
    },
    {
      id: 'chair',
      name: 'Chair',
      image:
        'https://www.ikea.com/in/en/images/products/bekant-desk-black-stained-ash-veneer-black__0736390_pe740519_s5.jpg?f=xl',
    },
    {
      id: 'desk',
      name: 'Desk',
      image:
        'https://www.ikea.com/in/en/images/products/bekant-desk-black-stained-ash-veneer-black__0736390_pe740519_s5.jpg?f=xl',
    },
    {
      id: 'keyboard',
      name: 'Keyboard',
      image:
        'https://www.ikea.com/in/en/images/products/bekant-desk-black-stained-ash-veneer-black__0736390_pe740519_s5.jpg?f=xl',
    },
    {
      id: 'mouse',
      name: 'Mouse',
      image:
        'https://www.ikea.com/in/en/images/products/bekant-desk-black-stained-ash-veneer-black__0736390_pe740519_s5.jpg?f=xl',
    },
  ];

  selected = new Set<string>();

  constructor(private storage: StorageService, private router: Router) {}

  onSelect(i: number) {
    const item = this.categories[i].id;
    if (this.selected.has(item)) {
      this.selected.delete(item);
    } else {
      this.selected.add(item);
    }
  }

  proceed() {
    if (this.selected.size > 1) {
      this.storage.setItem<string[]>('lookingFor', Array.from(this.selected));
    }
    this.router.navigate(['']);
  }
}
