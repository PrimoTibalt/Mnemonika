import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ButtonsHiderService {

  buttonsHide = { hide: false };

  constructor() { }

  hideButtons()
  {
    this.buttonsHide.hide = true;
  }

  showButtons()
  {
    this.buttonsHide.hide = false;
  }
}
