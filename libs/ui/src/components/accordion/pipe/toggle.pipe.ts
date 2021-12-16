import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getToggleFunction',
})
export class TogglePipe implements PipeTransform {
  /**
   * Make the toggle function available to be called from
   * outside.
   * @param i
   * @param toggleFn
   */
  transform(i: number, toggleFn: (index: number) => void) {
    return () => toggleFn(i);
  }
}
