import { TestBed } from '@angular/core/testing';

import { GetByCategoryTasksasksUseCase } from './get-by-category-tasks.usecase';

describe('GetByCategoryTasksasksUseCase', () => {
  let service: GetByCategoryTasksasksUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetByCategoryTasksasksUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
