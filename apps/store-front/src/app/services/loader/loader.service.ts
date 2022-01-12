import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, debounce, Observable, Subject, takeUntil, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService implements OnDestroy {
  private readonly showLoaderSubject = new BehaviorSubject(false);
  public readonly showLoader$: Observable<boolean> = this.showLoaderSubject.asObservable();

  private readonly destroySubject = new Subject<void>();
  private readonly stacker = new Subject<boolean>();

  constructor() {
    this.stacker
      .pipe(
        debounce(() => timer(300)),
        takeUntil(this.destroySubject)
      )
      .subscribe((loading) => this.showLoaderSubject.next(loading));
  }

  ngOnDestroy() {
    this.destroySubject.next();
  }

  show() {
    this.stacker.next(true);
  }

  hide() {
    this.stacker.next(false);
  }

  update(loading: boolean) {
    if (loading) {
      this.show();
    } else {
      this.hide();
    }
  }
}
