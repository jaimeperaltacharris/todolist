import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalCategoryComponent } from './modal-category.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CreateCategoryUseCase } from '@core/uses-cases/categories/create/create-category.usecase';
import { Category } from '@core/entities/category';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ModalCategoryComponent', () => {
  let component: ModalCategoryComponent;
  let fixture: ComponentFixture<ModalCategoryComponent>;
  let mockCreateCategoryUseCase: jasmine.SpyObj<CreateCategoryUseCase>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    mockCreateCategoryUseCase = jasmine.createSpyObj('CreateCategoryUseCase', ['execute']);
    mockCreateCategoryUseCase.execute.and.resolveTo();

    await TestBed.configureTestingModule({
      imports: [ModalCategoryComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: CreateCategoryUseCase, useValue: mockCreateCategoryUseCase },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCategoryComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Constructor and Form Initialization', () => {
    it('should initialize the form with default values and validators', () => {
      expect(component.form instanceof FormGroup).toBeTrue();
      
      expect(component.form.get('name')?.value).toBe('');
      expect(component.form.get('description')?.value).toBe('');
      
      const nameControl = component.form.get('name');
      expect(nameControl?.hasValidator(Validators.required)).toBeTrue();
      
      nameControl?.setValue('ab');
      expect(nameControl?.valid).toBeFalse();
      
      nameControl?.setValue('abc');
      expect(nameControl?.valid).toBeTrue();
    });
  });

  describe('onSaveCategory', () => {
    let emitSpy: jasmine.Spy;
    
    const categoryInfo: Omit<Category, 'id'> = {
      name: 'New Category',
      description: 'A description',
    };

    beforeEach(() => {
      emitSpy = spyOn(component.needReloadTasks, 'emit');
    });

    it('should call CreateCategoryUseCase.execute with correct data', async () => {
      await component.onSaveCategory(categoryInfo);

      expect(mockCreateCategoryUseCase.execute).toHaveBeenCalledWith(categoryInfo);
      expect(mockCreateCategoryUseCase.execute).toHaveBeenCalledTimes(1);
    });

    it('should emit needReloadTasks(true) after successful creation', async () => {
      await component.onSaveCategory(categoryInfo);

      expect(emitSpy).toHaveBeenCalledWith(true);
      expect(emitSpy).toHaveBeenCalledTimes(1);
    });

    it('should still emit needReloadTasks(true) even if the creation fails (simulating fire-and-forget)', async () => {
      const error = new Error('Creation failed in repository');
      mockCreateCategoryUseCase.execute.and.rejectWith(error);
      let caughtError;
      try {
        await component.onSaveCategory(categoryInfo);
      } catch (e) {
        caughtError = e;
      }

      expect(mockCreateCategoryUseCase.execute).toHaveBeenCalledTimes(1);
      expect(emitSpy).not.toHaveBeenCalled();
      expect(caughtError).toBe(error);
    });
  });
});