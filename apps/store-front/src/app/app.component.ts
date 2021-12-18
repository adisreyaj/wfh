import { Component, Inject, OnDestroy } from '@angular/core';
import { OverlayService } from '@wfh/ui';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'wfh-root',
  template: ` <div
      *ngIf="showOverlay$ | async"
      class="w-screen h-screen fixed z-10 bg-black opacity-50"
      (click)="overlayService.clickedOutsideSubject.next()"
    ></div>
    <router-outlet></router-outlet>`,
})
export class AppComponent implements OnDestroy {
  readonly showOverlay$: Observable<boolean>;

  readonly destroy$ = new Subject<void>();

  constructor(public overlayService: OverlayService, @Inject(DOCUMENT) private document: Document) {
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
