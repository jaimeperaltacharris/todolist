import { TestBed } from '@angular/core/testing';
import { UpdateStatusTaskUseCase } from './update-status-task.usecase';

describe('UpdateStatusTaskUseCase', () => {
  let service: UpdateStatusTaskUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateStatusTaskUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
