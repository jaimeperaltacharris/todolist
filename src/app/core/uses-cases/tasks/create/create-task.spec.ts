import { TestBed } from '@angular/core/testing';
import { CreateTaskUseCase } from './create-task.usecase';


describe('CreateTask', () => {
  let service: CreateTaskUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTaskUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
