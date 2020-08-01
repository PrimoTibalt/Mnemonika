/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BubblesEffectService } from './bubblesEffect.service';

describe('Service: BubblesEffect', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BubblesEffectService]
    });
  });

  it('should ...', inject([BubblesEffectService], (service: BubblesEffectService) => {
    expect(service).toBeTruthy();
  }));
});
