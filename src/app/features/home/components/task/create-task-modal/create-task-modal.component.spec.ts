import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTaskModalComponent } from './create-task-modal.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreateTaskUseCase } from '@core/uses-cases/tasks/create/create-task.usecase';
import { Task } from '@core/entities/task';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GetAllCategoriesUseCase } from '@core/uses-cases/categories/getAll/get-all-categories.usecase';

describe('CreateTaskModalComponent', () => {
  let component: CreateTaskModalComponent;
  let fixture: ComponentFixture<CreateTaskModalComponent>;
  let mockCreateTaskUseCase: jasmine.SpyObj<CreateTaskUseCase>;
  let mockGetAllCategoryUseCase: jasmine.SpyObj<GetAllCategoriesUseCase>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    mockGetAllCategoryUseCase = jasmine.createSpyObj('CreateTaskUseCase', ['execute']);
    mockCreateTaskUseCase = jasmine.createSpyObj('GetAllCategoriesUseCase', ['execute']);
    mockCreateTaskUseCase.execute.and.resolveTo({ id: 1 } as Task);

    await TestBed.configureTestingModule({
      imports: [CreateTaskModalComponent],
      providers: [
        ReactiveFormsModule,
        FormBuilder,
        { provide: CreateTaskUseCase, useValue: mockCreateTaskUseCase },
        { provide: GetAllCategoriesUseCase, useValue: mockGetAllCategoryUseCase }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTaskModalComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Constructor and Form Initialization', () => {
    it('should initialize taskForm with correct controls and required validators', () => {
      expect(component.taskForm instanceof FormGroup).toBeTrue();
      
      const nameControl = component.taskForm.get('name');
      const categoryIdControl = component.taskForm.get('category_id');
      const descriptionControl = component.taskForm.get('description');

      expect(nameControl?.value).toBe('');
      expect(descriptionControl?.value).toBe('');
      expect(categoryIdControl?.value).toBe('');
      
      expect(nameControl?.hasValidator(Validators.required)).toBeTrue();
      expect(categoryIdControl?.hasValidator(Validators.required)).toBeTrue();
      expect(descriptionControl?.hasValidator(Validators.required)).toBeFalse();
      
      expect(component.taskForm.valid).toBeFalse();
      nameControl?.setValue('Test');
      categoryIdControl?.setValue(1);
      expect(component.taskForm.valid).toBeTrue();
    });
  });

  describe('onSaveTask', () => {
    let emitSpy: jasmine.Spy;
    
    const taskInfo: Omit<Task, 'id'> = {
      name: 'New Task Title',
      description: 'Task description',
      category_id: 5,
    };

    beforeEach(() => {
      emitSpy = spyOn(component.needReloadTasks, 'emit');
    });

    it('should call CreateTaskUseCase.execute with correct data', async () => {
      await component.onSaveTask(taskInfo);

      const expectedPayload = {
        name: taskInfo.name,
        description: taskInfo.description,
        category_id: taskInfo.category_id
      };

      expect(mockCreateTaskUseCase.execute).toHaveBeenCalledWith(expectedPayload);
      expect(mockCreateTaskUseCase.execute).toHaveBeenCalledTimes(1);
    });

    it('should emit needReloadTasks(true) after successful creation', async () => {
      await component.onSaveTask(taskInfo);

      expect(emitSpy).toHaveBeenCalledWith(true);
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should propagate error if creation fails', async () => {
      const error = new Error('Database connection failed');
      mockCreateTaskUseCase.execute.and.rejectWith(error);
      
      let caughtError;
      try {
        await component.onSaveTask(taskInfo);
      } catch (e) {
        caughtError = e;
      }

      expect(mockCreateTaskUseCase.execute).toHaveBeenCalledTimes(1);
      expect(emitSpy).not.toHaveBeenCalled();
      expect(caughtError).toBe(error);
    });
  });
});