import { CommonModule } from '@angular/common';
import { Attribute, ChangeDetectionStrategy, Component, HostBinding, Input, NgModule } from '@angular/core';
@Component({
  selector: 'button',
  template: ` <ng-content></ng-content> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @HostBinding('class')
  get buttonClasses() {
    const baseClasses = new Set([
      'button',
      'px-5',
      'py-3',
      'text-base',
      'font-medium',
      'transition',
      'duration-150',
      'ease-in-out',
    ]);
    this.class.split(' ').forEach((c) => baseClasses.add(c));
    switch (this.variant) {
      case 'secondary':
        baseClasses.add('bg-secondary');
        baseClasses.add('text-white');
        break;
      default:
        baseClasses.add('bg-primary');
        baseClasses.add('text-white');
        break;
    }
    return Array.from(baseClasses).join(' ');
  }
  @Input()
  class = '';

  constructor(@Attribute('variant') private variant: string) {}
}

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule],
  exports: [ButtonComponent],
})
export class ButtonModule {}
