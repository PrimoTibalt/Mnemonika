/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MnemoKeeperService } from './mnemoKeeper.service';

describe('Service: MnemoKeeper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MnemoKeeperService]
    });
  });

  it('should ...', inject([MnemoKeeperService], (service: MnemoKeeperService) => {
    expect(service).toBeTruthy();
  }));
});
