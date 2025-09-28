import { TestBed } from '@angular/core/testing';

import { DeleteCategoryUseCase } from './delete-category.usecase';

describe('DeleteCategoryUseCase', () => {
  let service: DeleteCategoryUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteCategoryUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
