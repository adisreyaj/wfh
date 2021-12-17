import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  showOverlaySubject = new BehaviorSubject(false);
  showOverlay$ = this.showOverlaySubject.asObservable();
}
