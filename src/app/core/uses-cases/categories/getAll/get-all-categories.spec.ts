import { TestBed } from '@angular/core/testing';

import { GetAllCategoriesUseCase } from './get-all-categories.usecase';

describe('GetAllCategoriesUseCase', () => {
  let service: GetAllCategoriesUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllCategoriesUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
