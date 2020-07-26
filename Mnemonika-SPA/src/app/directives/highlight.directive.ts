import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  @Input('appHighlight') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter()
  {
    this.highlight(this.highlightColor || '#de1dde');
  }

  @HostListener('mouseleave') onMouseLeave()
  {
    this.highlight(this.highlightColor || null);
  }

  private highlight(color: string)
  {
    this.el.nativeElement.style.backgroundColor = color;
  }
}