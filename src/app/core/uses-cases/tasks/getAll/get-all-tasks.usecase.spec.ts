import { TestBed } from '@angular/core/testing';
import { GetAllTasksUseCase } from './get-all-tasks.usecase';

describe('GetAllTasks', () => {
  let service: GetAllTasksUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllTasksUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
