import { Component, Inject, OnDestroy } from '@angular/core';
import { OverlayService } from '@wfh/ui';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { LoaderService } from '@wfh/store-front/service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'wfh-root',
  template: `
    <div
      *ngIf="showOverlay$ | async"
      class="w-screen h-screen fixed z-10 bg-black opacity-50"
      (click)="overlayService.clickedOutsideSubject.next()"
    ></div>
    <router-outlet></router-outlet>
    <div
      @fadeSlideInOut
      *ngIf="loaderService.showLoader$ | async"
      class="flex items-center gap-4 bg-primary fixed bottom-4 right-4 shadow-2xl rounded-md p-4"
    >
      <img src="assets/images/loading.svg" alt="loading" class="w-8 h-8" />
      <p class="text-sm text-white">Loading...Hold Tight!</p>
    </div>
  `,
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('200ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0, transform: 'translateY(10px)' })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnDestroy {
  readonly showOverlay$: Observable<boolean>;

  readonly destroy$ = new Subject<void>();

  constructor(
    public overlayService: OverlayService,
    @Inject(DOCUMENT) private document: Document,
    public loaderService: LoaderService
  ) {
    this.showOverlay$ = this.overlayService.showOverlay$;
    this.showOverlay$.pipe(takeUntil(this.destroy$)).subscribe((isOpen) => {
      if (isOpen) {
        this.document.body.classList.add('overflow-y-hidden');
      } else {
        this.document.body.classList.remove('overflow-y-hidden');
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
