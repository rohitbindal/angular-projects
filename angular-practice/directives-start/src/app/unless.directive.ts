import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }
  // TemplateRef => To get the template, vcRef => to get the ViewContainer that needs to be manipulated.
  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {

  }

}
