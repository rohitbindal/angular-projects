import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  // Creating custom attributes
  @Input() defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';

  // HostBinding Decorator can be used to bind to any property of an element,
  // here, we are binding to the style property.
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;
  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
  }

  // Listen to a user event and apply the specified styles using HostListener Decorator
  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.elementRef.nativeElement.style.backgroundColor = 'blue';
    this.backgroundColor = this.highlightColor;

  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.elementRef.nativeElement.style.backgroundColor = 'transparent';
    this.backgroundColor = this.defaultColor;


  }
}
