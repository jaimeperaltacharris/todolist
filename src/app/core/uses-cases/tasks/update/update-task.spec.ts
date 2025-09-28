import { TestBed } from '@angular/core/testing';

import { UpdateTask } from './update-task.usecase';

describe('UpdateTask', () => {
  let service: UpdateTask;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateTask);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
