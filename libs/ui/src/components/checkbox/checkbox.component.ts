import { Component, Input, NgModule } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wfh-checkbox',
  template: `
    <div class="checkbox flex items-center gap-2">
      <input
        [id]="label ? label : id"
        type="checkbox"
        [checked]="checked"
        (change)="onChange($event)"
        [disabled]="disabled"
      />
      <label [for]="label ? label : id">
        <ng-container *ngIf="!label; else labelTpl">
          <ng-content></ng-content>
        </ng-container>

        <ng-template #labelTpl>
          <p class="cursor-pointer text-sm">
            {{ label }}
          </p>
        </ng-template>
      </label>
    </div>
  `,
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label?: string;
  @Input() id?: string;

  checked = false;
  changed!: (value: boolean) => void;
  touched!: () => void;
  disabled = false;

  onChange(event: any) {
    this.checked = event.target.checked;
  }

  registerOnChange(fn: any): void {
    this.changed = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  writeValue(obj: any): void {
    this.checked = obj;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}

@NgModule({
  declarations: [CheckboxComponent],
  imports: [CommonModule],
  exports: [CheckboxComponent],
})
export class CheckboxModule {}
