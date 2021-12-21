import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { isNil } from 'lodash-es';

@Pipe({
  name: 'suggestionGroup',
})
export class SuggestionGroupPipe implements PipeTransform {
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

@NgModule({
  declarations: [SuggestionGroupPipe],
  exports: [SuggestionGroupPipe],
})
export class SuggestionsGroupPipeModule {}
