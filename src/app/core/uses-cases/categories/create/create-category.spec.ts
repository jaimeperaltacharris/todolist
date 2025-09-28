import { TestBed } from '@angular/core/testing';

import { CreateCategoryUseCase } from './create-category.usecase';

describe('CreateCategoryUseCase', () => {
  let service: CreateCategoryUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCategoryUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
