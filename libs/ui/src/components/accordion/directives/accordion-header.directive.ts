import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[wfhAccordionHeader]',
})
export class AccordionHeader {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
