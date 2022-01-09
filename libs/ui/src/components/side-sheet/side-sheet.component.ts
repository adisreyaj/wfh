import { Component, HostBinding, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon.module';
import { ButtonModule } from '../button/button.component';
import { OverlayService } from '../../common';

@Component({
  selector: 'wfh-side-sheet',
  template: `
    <ng-container *ngIf="isOpen">
      <button variant="neutral" size="small" wfh class="fixed top-4 right-4 z-10" (click)="close()">
        <rmx-icon name="close-line"></rmx-icon>
      </button>
      <div class="h-full">
        <ng-content></ng-content>
      </div>
    </ng-container>
  `,
  styles: [
    `
      :host {
        @apply fixed z-20 right-0 top-0 h-screen bg-white shadow-lg overflow-y-auto rounded-tl-lg rounded-bl-lg;
        @apply transition-all duration-300 translate-x-80;
      }

      :host-context(.open) {
        width: 100%;
        max-width: 600px;
        @apply translate-x-0;
      }
    `,
  ],
})
export class SideSheetComponent {
  @Input()
  @HostBinding('class.open')
  isOpen = false;

  constructor(private overlayService: OverlayService) {}

  toggle() {
    this.isOpen = !this.isOpen;
    this.updateOverlay();
  }

  open() {
    this.isOpen = true;
    this.updateOverlay();
  }

  close() {
    this.isOpen = false;
    this.updateOverlay();
  }

  updateOverlay() {
    this.overlayService.showOverlaySubject.next(this.isOpen);
  }
}

@NgModule({
  declarations: [SideSheetComponent],
  imports: [CommonModule, ButtonModule, IconModule],
  exports: [SideSheetComponent],
})
export class SideSheetModule {}
