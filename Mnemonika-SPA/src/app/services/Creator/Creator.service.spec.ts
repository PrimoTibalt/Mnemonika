/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreatorService } from './Creator.service';

describe('Service: Creator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatorService]
    });
  });

  it('should ...', inject([CreatorService], (service: CreatorService) => {
    expect(service).toBeTruthy();
  }));
});
