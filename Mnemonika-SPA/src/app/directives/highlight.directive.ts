import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  @Input('appHighlight') highlightColor: string;

  @HostListener('mouseenter') onMouseEnter()
  {
    if(this.el.nativeElement.id === 'collection-back-button'){
      this.highlight('black');
      this.el.nativeElement.style.color = 'white';
    }
    else{
      this.highlight(this.highlightColor || '#de1dde');
    }
  }

  @HostListener('mouseleave') onMouseLeave()
  {
    this.highlight(this.highlightColor || null);
    if(this.el.nativeElement.id === 'collection-back-button'){
      this.el.nativeElement.style.color = 'black';
    }
  }

  private highlight(color: string)
  {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
