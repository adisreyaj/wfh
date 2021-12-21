import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { isNil } from 'lodash-es';

@Pipe({
  name: 'suggestionsGroup',
})
export class SuggestionsGroupPipe implements PipeTransform {
  transform(value: Record<string, any>): { key: string; value: any[] }[] {
    if (isNil(value)) {
      return [];
    }
    return Object.keys(value).map((key) => {
      return {
        key: key,
        value: value[key],
      };
    });
  }
}

@Pipe({
  name: 'suggestionVisible',
})
export class SuggestionsVisiblePipe implements PipeTransform {
  transform(value: Record<string, any[]>): boolean {
    if (isNil(value)) {
      return false;
    }
    return Object.keys(value).some((key) => {
      return value[key].length > 0;
    });
  }
}

@NgModule({
  declarations: [SuggestionsGroupPipe, SuggestionsVisiblePipe],
  exports: [SuggestionsGroupPipe, SuggestionsVisiblePipe],
})
export class SuggestionsHelperModule {}
