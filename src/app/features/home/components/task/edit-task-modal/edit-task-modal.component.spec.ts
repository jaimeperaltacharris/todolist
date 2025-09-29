import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditTaskModalComponent } from './edit-task-modal.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Task } from '@core/entities/task';
import { IEditTask } from '@features/home/interfaces/edit-task.interface';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GetAllCategoriesUseCase } from '@core/uses-cases/categories/getAll/get-all-categories.usecase';

describe('EditTaskModalComponent', () => {
  let component: EditTaskModalComponent;
  let fixture: ComponentFixture<EditTaskModalComponent>;
  let formBuilder: FormBuilder;
  let mockGetAllCategoryUseCase: jasmine.SpyObj<GetAllCategoriesUseCase>;

  const mockTask: Task = {
    id: 1,
    name: 'Original Title',
    description: 'Original Description',
    completed: false,
    category_id: 10
  };

  beforeEach(async () => {
    mockGetAllCategoryUseCase = jasmine.createSpyObj('CreateTaskUseCase', ['execute']);

    await TestBed.configureTestingModule({
      imports: [EditTaskModalComponent, ReactiveFormsModule],
      providers: [FormBuilder,
        { provide: GetAllCategoriesUseCase, useValue: mockGetAllCategoryUseCase }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTaskModalComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    component.task = mockTask;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the form with task data and validators', () => {
      expect(component.taskForm instanceof FormGroup).toBeTrue();
      
      expect(component.taskForm.get('name')?.value).toBe(mockTask.name);
      expect(component.taskForm.get('description')?.value).toBe(mockTask.description);
      expect(component.taskForm.get('category_id')?.value).toBe(mockTask.category_id);
      
      const nameControl = component.taskForm.get('name');
      const categoryIdControl = component.taskForm.get('category_id');
      
      expect(nameControl?.hasValidator(Validators.required)).toBeTrue();
      expect(categoryIdControl?.hasValidator(Validators.required)).toBeTrue();

      expect(component.taskForm.valid).toBeTrue();
    });
  });

  describe('closeModal', () => {
    let emitSpy: jasmine.Spy;

    beforeEach(() => {
      emitSpy = spyOn(component.editTask, 'emit');
    });

    it('should emit isEdited: false and null taskInfo when called without arguments (cancel)', () => {
      component.closeModal();

      const expectedEmit: IEditTask = {
        isEdited: false,
        taskInfo: undefined
      };

      expect(emitSpy).toHaveBeenCalledWith(expectedEmit);
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit isEdited: true and taskInfo when a task object is passed (success)', () => {
      const updatedTaskInfo = { name: 'Updated Title', description: 'New Desc', category_id: 20 };
      component.closeModal(updatedTaskInfo);

      const expectedEmit: IEditTask = {
        isEdited: true,
        taskInfo: updatedTaskInfo
      };

      expect(emitSpy).toHaveBeenCalledWith(expectedEmit);
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });
  });
});