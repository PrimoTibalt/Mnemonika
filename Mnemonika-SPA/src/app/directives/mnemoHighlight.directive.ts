import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMnemoHighlight]'
})
export class MnemoHighlightDirective {

  constructor(private el: ElementRef) { }

  @Input('appMnemoHighlight') highlightBorder: string;

  @HostListener('mouseenter') onMouseEnter()
  {
    this.highlight(this.highlightBorder || '2px solid');
  }

  @HostListener('mouseleave') onMouseLeave()
  {
    this.highlight(this.highlightBorder || null);
  }

  private highlight(border: string)
  {
    this.el.nativeElement.style.border = border;
    this.el.nativeElement.style.padding = border ? '6px' : '8px';
  }
}
