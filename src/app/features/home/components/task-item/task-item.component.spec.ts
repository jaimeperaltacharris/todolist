import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { UpdateStatusTaskUseCase } from '@core/uses-cases/tasks/updateStatus/update-status-task.usecase';
import { DeleteTaskUseCase } from '@core/uses-cases/tasks/delete/delete-task.usecase';
import { Task } from '@core/entities/task';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const mockUpdateStatusTask = jasmine.createSpyObj('UpdateStatusTaskUseCase', ['execute']);
mockUpdateStatusTask.execute.and.resolveTo();

const mockDeleteTask = jasmine.createSpyObj('DeleteTaskUseCase', ['execute']);
mockDeleteTask.execute.and.resolveTo();

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  const initialTask: Task = {
    id: 5,
    name: 'Finalize presentation',
    completed: false,
    category_id: 1
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent],
      providers: [
        { provide: UpdateStatusTaskUseCase, useValue: mockUpdateStatusTask },
        { provide: DeleteTaskUseCase, useValue: mockDeleteTask },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = { ...initialTask };

    fixture.detectChanges();
  });

  afterEach(() => {
    mockUpdateStatusTask.execute.calls.reset();
    mockDeleteTask.execute.calls.reset();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('updateStatusTask', () => {
    let emitSpy: jasmine.Spy;

    beforeEach(() => {
      emitSpy = spyOn(component.statusUpdated, 'emit');
    });

    it('should call use case with status 1 (completed) if task is currently false', async () => {
      component.task.completed = false;

      await component.updateStatusTask();

      expect(mockUpdateStatusTask.execute).toHaveBeenCalledWith(component.task.id, 1);
      expect(mockUpdateStatusTask.execute).toHaveBeenCalledTimes(1);
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should call use case with status 0 (uncompleted) if task is currently true', async () => {
      component.task.completed = true;

      await component.updateStatusTask();

      expect(mockUpdateStatusTask.execute).toHaveBeenCalledWith(component.task.id, 0);
      expect(mockUpdateStatusTask.execute).toHaveBeenCalledTimes(1);
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteTask', () => {
    let emitSpy: jasmine.Spy;

    beforeEach(() => {
      emitSpy = spyOn(component.taskDeleted, 'emit');
    });

    it('should call the DeleteTaskUseCase with the correct ID and emit taskDeleted', async () => {
      await component.deleteTask();

      expect(mockDeleteTask.execute).toHaveBeenCalledWith(component.task.id);
      expect(mockDeleteTask.execute).toHaveBeenCalledTimes(1);
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });
  });
});