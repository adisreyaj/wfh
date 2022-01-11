import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(value: number | string, originalPrice: number | string): any {
    if (value && originalPrice) {
      return (((+originalPrice - +value) * 100) / +originalPrice).toFixed(0);
    }
  }
}

@NgModule({
  declarations: [DiscountPipe],
  exports: [DiscountPipe],
})
export class DiscountPipeModule {}
