import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[wfhAccordionContent]',
})
export class AccordionContent {
  constructor(public templateRef: TemplateRef<unknown>) {}
}
