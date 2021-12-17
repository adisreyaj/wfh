import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input, NgModule } from '@angular/core';

@Component({
  selector: 'button[wfh]',
  template: ` <ng-content></ng-content> `,
  styles: [
    `
      :host {
        @apply px-5 py-3 text-base font-medium;
        @apply transition duration-150 ease-in-out;
      }

      :host-context(.xsmall) {
        @apply px-2 py-1 text-xs font-medium;
      }

      :host-context(.small) {
        @apply px-2 py-2 text-sm font-medium;
      }

      :host-context(.primary) {
        @apply bg-primary text-white;
        @apply hover:bg-primary-dark;
      }

      :host-context(.secondary) {
        @apply bg-secondary text-white;
      }

      :host-context(.neutral) {
        @apply bg-gray-100 hover:bg-gray-200 hover:text-primary;
      }

      :host-context(.outline) {
        @apply hover:bg-gray-100 outline-none border border-gray-200 hover:text-primary;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input()
  class = '';
  @Input()
  variant = 'primary';

  @Input()
  size = 'base';

  @HostBinding('class')
  get buttonClasses() {
    const baseClasses = new Set(['button', this.variant ?? 'primary', this.size]);
    this.class.split(' ').forEach((c) => baseClasses.add(c));
    return Array.from(baseClasses).join(' ');
  }
}

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule],
  exports: [ButtonComponent],
})
export class ButtonModule {}
