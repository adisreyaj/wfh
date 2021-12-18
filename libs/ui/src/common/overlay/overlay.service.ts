import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  showOverlaySubject = new BehaviorSubject(false);
  showOverlay$ = this.showOverlaySubject.asObservable();

  clickedOutsideSubject = new Subject<void>();
  clickedOutside$ = this.clickedOutsideSubject.asObservable();
}
