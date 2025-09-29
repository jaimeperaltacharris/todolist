import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormTaskModalComponent } from './form-task-modal.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GetAllCategoriesUseCase } from '@core/uses-cases/categories/getAll/get-all-categories.usecase';
import { CategoryRepository } from '@core/repositories/category.repository'; 
import { Task } from '@core/entities/task';
import { Category } from '@core/entities/category';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const mockCategories: Category[] = [
  { id: 1, name: 'Work' },
  { id: 2, name: 'Personal' },
];

const mockGetAllCategories = jasmine.createSpyObj('GetAllCategoriesUseCase', ['execute']);
mockGetAllCategories.execute.and.resolveTo(mockCategories);

const mockCategoryRepository = jasmine.createSpyObj('CategoryRepository', ['getAll']);
mockCategoryRepository.getAll.and.resolveTo(mockCategories);

describe('FormTaskModalComponent', () => {
  let component: FormTaskModalComponent;
  let fixture: ComponentFixture<FormTaskModalComponent>;
  let formBuilder: FormBuilder;
  let testForm: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTaskModalComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: GetAllCategoriesUseCase, useValue: mockGetAllCategories },
        { provide: CategoryRepository, useValue: mockCategoryRepository }, 
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FormTaskModalComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    testForm = formBuilder.group({
      name: ['Initial Name', Validators.required],
      description: ['Initial Description'],
      category_id: [1, Validators.required],
    });

    component.taskForm = testForm;

    fixture.detectChanges(); 
  });

  it('should create the component and load categories on ngOnInit', () => {
    expect(component).toBeTruthy();
    expect(mockGetAllCategories.execute).toHaveBeenCalled();
    expect(component.categories).toEqual(mockCategories);
  });

  describe('submit', () => {
    let saveEmitSpy: jasmine.Spy;

    beforeEach(() => {
      saveEmitSpy = spyOn(component.save, 'emit');
    });

    it('should emit the form value and reset the form if the form is valid', () => {
      testForm.setValue({
        name: 'Buy groceries',
        description: 'Milk and bread',
        category_id: 1,
      });
      expect(testForm.valid).toBeTrue();

      component.submit();

      const expectedValue: Omit<Task, 'id'> = {
        name: 'Buy groceries',
        description: 'Milk and bread',
        category_id: 1,
      };
      expect(saveEmitSpy).toHaveBeenCalledWith(expectedValue);
      expect(saveEmitSpy).toHaveBeenCalledTimes(1);

      expect(testForm.value.name).toBeNull();
      expect(testForm.value.category_id).toBeNull();
    });

    it('should NOT emit the form value or reset the form if the form is invalid', () => {
      testForm.setValue({
        name: '', 
        description: 'Desc',
        category_id: 1,
      });
      expect(testForm.valid).toBeFalse();

      component.submit();

      expect(saveEmitSpy).not.toHaveBeenCalled();

      expect(testForm.value.name).toBe('');
      expect(testForm.value.description).toBe('Desc');
      expect(testForm.value.category_id).toBe(1);
    });
  });
});