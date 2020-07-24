/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeadersService } from './Headers.service';

describe('Service: Headers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeadersService]
    });
  });

  it('should ...', inject([HeadersService], (service: HeadersService) => {
    expect(service).toBeTruthy();
  }));
});
