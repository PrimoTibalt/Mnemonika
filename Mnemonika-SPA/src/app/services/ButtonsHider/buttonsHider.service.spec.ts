/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ButtonsHiderService } from './buttonsHider.service';

describe('Service: ButtonsHider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ButtonsHiderService]
    });
  });

  it('should ...', inject([ButtonsHiderService], (service: ButtonsHiderService) => {
    expect(service).toBeTruthy();
  }));
});
