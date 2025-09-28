import { TestBed } from '@angular/core/testing';

import { UpdateCategoryUseCase } from './update-category.usecase';

describe('UpdateCategoryUseCase', () => {
  let service: UpdateCategoryUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateCategoryUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
