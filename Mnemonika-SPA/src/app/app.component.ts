import { Component } from '@angular/core';
import { BubblesEffectService } from './services/BubblesEffect/bubblesEffect.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
  ]
})
export class AppComponent {
  title = 'Mnemonika-SPA';
  constructor(private bubbles: BubblesEffectService)
  {
    const body = document.getElementsByTagName('body')[0];
    body.addEventListener('click', () => {
      bubbles.ShowCircles(body);
    }, true);
  }
}
