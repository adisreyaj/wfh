import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[wfhAccordionTitle]',
})
export class AccordionTitle {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
