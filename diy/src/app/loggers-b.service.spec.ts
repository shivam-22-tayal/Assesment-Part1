import { TestBed } from '@angular/core/testing';

import { LoggersBService } from './loggers-b.service';

describe('LoggersBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggersBService = TestBed.get(LoggersBService);
    expect(service).toBeTruthy();
  });
});
