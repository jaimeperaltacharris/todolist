import { TestBed } from '@angular/core/testing';

import { DeleteTaskUseCase } from './delete-task.usecase';

describe('DeleteTaskUseCase', () => {
  let service: DeleteTaskUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteTaskUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
