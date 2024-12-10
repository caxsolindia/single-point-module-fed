import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorService],
    });
    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle error and log to console', () => {
    spyOn(console, 'error');
    const error = new Error('Test error');

    service.handleError(error);

    expect(console.error).toHaveBeenCalledWith('An error occurred:', error);
  });

  it('should show alert with error message', () => {
    spyOn(window, 'alert');
    const message = 'Test error message';

    service.throwError(message);

    expect(window.alert).toHaveBeenCalledWith(message);
  });
});
