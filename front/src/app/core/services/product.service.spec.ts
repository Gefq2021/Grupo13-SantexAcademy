import { TestBed } from '@angular/core/testing';

import { BackServiceService } from './product.service';

describe('BackServiceService', () => {
  let service: BackServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
