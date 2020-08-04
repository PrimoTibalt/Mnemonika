import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BubblesEffectService {

  constructor() { }

  public ShowCircles(body: HTMLBodyElement)
  {
    const circle: HTMLDivElement = this.createCircle();
    const innerCircle: HTMLDivElement = this.createCircle();
    this.addStylesForCircles(circle, innerCircle);
    this.addPulseEffect(circle);
    this.addPulseEffect(innerCircle);
    body.appendChild(circle);
    body.appendChild(innerCircle);
  }

  private addPulseEffect(element: HTMLDivElement)
  {
    element.classList.add('pulse');
  }

  private setCircleRightAndTopPosition(circle: HTMLDivElement, rAndT)
  {
    circle.style.right = rAndT.r * window.innerWidth + 'px';
    circle.style.top = rAndT.t * window.innerHeight + 'px';
  }

  private setCircleWidthAndHeight(circle: HTMLDivElement, diameter)
  {
    circle.style.width = diameter + 'px';
    circle.style.height = diameter + 'px';
    circle.style.borderRadius = '50%';
  }

  private createCircle() : HTMLDivElement{
    const circle = document.createElement('div');
    return circle;
  }

  private addCommonStylesForCircle(circle: HTMLDivElement){
    circle.style.zIndex = '0';
    circle.style.position = 'absolute';
    circle.className = 'circle';
  }

  private addPositionStyles(circle: HTMLDivElement){
    const right = Math.random();
    const top = Math.random();
    const rAndT = { r: right, t: top};
    this.setCircleRightAndTopPosition(circle, rAndT);
    return rAndT;
  }

  private addPositionStylesInnerCircle(innerCircle: HTMLDivElement, rAndT, size: number, innerSize: number)
  {
    rAndT.r += (size - innerSize) / 2 / window.innerWidth;
    rAndT.t += (size - innerSize) / 2 / window.innerHeight;
    this.setCircleRightAndTopPosition(innerCircle, rAndT);
  }



  private addStylesForCircles(circle: HTMLDivElement, innerCircle: HTMLDivElement){
    this.addCommonStylesForCircle(circle);
    this.addCommonStylesForCircle(innerCircle);

    const position = this.addPositionStyles(circle);
    const size = this.addViewStyles(circle);

    const randInnerDiameter = Math.random();
    const innerSize = size * ((randInnerDiameter < 0.5) ? 0.5 : randInnerDiameter);

    this.addPositionStylesInnerCircle(innerCircle, position, size, innerSize);
    this.addViewStylesInnerCircle(innerCircle, innerSize);
  }

  private addViewStylesInnerCircle(innerCircle: HTMLDivElement, diameter: number) {
    innerCircle.style.backgroundColor = 'white';
    this.setCircleWidthAndHeight(innerCircle, diameter);
  }

  private addViewStyles(circle: HTMLDivElement): number{
    circle.style.backgroundColor = this.randomChooseColor();
    const randDiameter = Math.random();
    const size = (randDiameter > 0.5 ? randDiameter : 0.5) * 200;
    this.setCircleWidthAndHeight(circle, size);
    return size;
  }

  private randomChooseColor(): string
  {
    const value = Math.random() * 10;
    if (value < 1) {
      return 'blue';
    } else if (value < 2) {
      return 'green';
    } else if (value < 3) {
      return '#00A67C';
    } else if (value < 4) {
      return '#876ED7';
    } else if (value < 5) {
      return '#412C84';
    } else if (value < 6) {
      return '#3C9DD0';
    } else if (value < 7) {
      return '#A8F000';
    } else if (value < 8) {
      return '#48036F';
    } else if (value < 9) {
      return '#7109AA';
    } else if (value < 10) {
      return 'red';
    } 
  }
}
