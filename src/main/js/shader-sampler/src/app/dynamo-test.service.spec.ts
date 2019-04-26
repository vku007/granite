import { TestBed } from '@angular/core/testing';

import { DynamoTestService } from './dynamo-test.service';

describe('DynamoTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DynamoTestService = TestBed.get(DynamoTestService);
    expect(service).toBeTruthy();
  });
});
